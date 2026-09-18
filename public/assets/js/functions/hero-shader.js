/* CodeKat · hero con shader WebGL aurora (violeta/ámbar sobre negro).
   Recreación propia del estilo animated-shader-hero. Vanilla WebGL, sin dependencias.
   Se pausa fuera de pantalla, respeta reduced-motion y se retira si WebGL falla. */
(() => {
  const cv = document.getElementById("heroShader");
  if (!cv) return;
  const hero = document.getElementById("inicio");
  const reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const VS = "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}";
  const FS = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){
  vec2 i=floor(p),f=fract(p);
  vec2 u=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1.,0.)),u.x),
             mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),u.x),u.y);
}
float fbm(vec2 p){
  float v=0.,a=.5;
  for(int i=0;i<5;i++){v+=a*noise(p);p=p*2.03+vec2(1.7,9.2);a*=.55;}
  return v;
}
void main(){
  vec2 uv=gl_FragCoord.xy/u_res.xy;
  float aspect=u_res.x/u_res.y;
  vec2 p=(uv-.5)*vec2(aspect*1.7,1.15);
  float t=u_time*.07;
  // dominio deformado: dos fbm cruzados = aurora fluida
  vec2 q=vec2(fbm(p+t*.7),fbm(p+vec2(5.2,1.3)-t*.5));
  vec2 r=vec2(fbm(p+2.6*q+vec2(1.7,9.2)+t*.35),fbm(p+2.6*q+vec2(8.3,2.8)-t*.28));
  float f=fbm(p+2.4*r);
  vec3 col=vec3(.030,.030,.052);
  // violeta CodeKat
  vec3 violet=vec3(.32,.20,.85);
  col+=violet*smoothstep(.25,.95,f)*.85;
  // segundo velo violeta claro
  col+=vec3(.45,.38,.95)*smoothstep(.45,1.,r.y)*.35;
  // ámbar CodeKat en crestas altas
  vec3 amber=vec3(.96,.65,.14);
  col+=amber*smoothstep(.62,1.,pow(f,1.4)*r.x*1.6)*.55;
  // luz que sigue al cursor
  float md=length((uv-.5)*vec2(aspect,1.)-(u_mouse-.5)*vec2(aspect,1.));
  col+=vec3(.45,.32,.95)*smoothstep(.45,.0,md)*.5;
  col+=vec3(1.,.75,.3)*smoothstep(.16,.0,md)*.35;
  // viñeta para texto legible
  float vig=smoothstep(1.05,.35,length((uv-.5)*vec2(aspect*.8,1.)));
  col*=mix(.55,1.,vig);
  // grano sutil
  col+=(hash(gl_FragCoord.xy+u_time)-.5)*.028;
  gl_FragColor=vec4(col,1.);
}`;

  let gl = null;
  try {
    gl = cv.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" })
      || cv.getContext("experimental-webgl");
  } catch (e) { gl = null; }
  if (!gl) { cv.remove(); return; }

  function shader(type, src) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error("shader");
    return s;
  }
  let prog = null;
  try {
    prog = gl.createProgram();
    gl.attachShader(prog, shader(gl.VERTEX_SHADER, VS));
    gl.attachShader(prog, shader(gl.FRAGMENT_SHADER, FS));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error("link");
  } catch (e) { cv.remove(); return; }
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, "p");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const uRes = gl.getUniformLocation(prog, "u_res");
  const uTime = gl.getUniformLocation(prog, "u_time");
  const uMouse = gl.getUniformLocation(prog, "u_mouse");
  const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };

  function resize() {
    const r = (hero || cv.parentElement).getBoundingClientRect();
    if (!r.width || !r.height) return false;
    const dpr = Math.min(1.5, window.devicePixelRatio || 1);
    const w = Math.round(r.width * dpr), h = Math.round(r.height * dpr);
    if (cv.width !== w || cv.height !== h) { cv.width = w; cv.height = h; }
    gl.viewport(0, 0, w, h);
    return true;
  }

  function draw(now) {
    mouse.x += (mouse.tx - mouse.x) * 0.04;
    mouse.y += (mouse.ty - mouse.y) * 0.04;
    gl.uniform2f(uRes, cv.width, cv.height);
    gl.uniform1f(uTime, now / 1000);
    gl.uniform2f(uMouse, mouse.x, mouse.y);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  let raf = 0, running = false, visible = true, t0 = Math.random() * 10000;
  function frame(now) {
    draw((now || 0) + t0);
    if (running) raf = requestAnimationFrame(frame);
  }
  function start() {
    if (running || !visible) return;
    if (reduced) { if (resize()) draw(t0); return; }
    if (!resize()) return;
    running = true;
    raf = requestAnimationFrame(frame);
  }
  function stop() {
    running = false;
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
  }

  if (hero) {
    hero.addEventListener("pointermove", (e) => {
      const r = cv.getBoundingClientRect();
      if (!r.width || !r.height) return;
      mouse.tx = (e.clientX - r.left) / r.width;
      mouse.ty = 1 - (e.clientY - r.top) / r.height;
    }, { passive: true });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver((es) => {
        visible = es[0].isIntersecting;
        if (visible) start(); else stop();
      }, { threshold: 0.02 }).observe(hero);
    }
  }
  window.addEventListener("resize", () => { if (running) resize(); else start(); }, { passive: true });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
    else start();
  });
  cv.addEventListener("webglcontextlost", (e) => { e.preventDefault(); stop(); cv.remove(); });
  start();
})();
