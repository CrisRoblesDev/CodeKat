/* CodeKat · hero con el shader animated-shader-hero (port vanilla del componente
   React original; misma lógica WebGLRenderer + PointerHandler, sin React).
   Shader: "made by Matthias Hurrle (@atzedent)", recolorizado a violeta/ámbar CodeKat.
   Se pausa fuera de pantalla, respeta reduced-motion y se retira si WebGL2 falla. */
(() => {
  const cv = document.getElementById("heroShader");
  if (!cv) return;
  const hero = document.getElementById("inicio");
  const reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Paleta CodeKat: rayos violeta/magenta/ámbar, fondo profundo violeta.
  const FRAG = `#version 300 es
/*********
* made by Matthias Hurrle (@atzedent)
*
*	To explore strange new worlds, to seek out new life
*	and new civilizations, to boldly go where no man has
*	gone before.
*
* Recoloreado CodeKat: violeta #8B5CF6 + ambar #F5A524.
*/
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
uniform vec2 move;
uniform vec2 touch;
uniform int pointerCount;
uniform vec2 pointers[10];
#define FC gl_FragCoord.xy
#define T time
#define R resolution
#define MN min(R.x,R.y)
float rnd(vec2 p) {
  p=fract(p*vec2(12.9898,78.233));
  p+=dot(p,p+34.56);
  return fract(p.x*p.y);
}
float noise(in vec2 p) {
  vec2 i=floor(p), f=fract(p), u=f*f*(3.-2.*f);
  float
  a=rnd(i),
  b=rnd(i+vec2(1,0)),
  c=rnd(i+vec2(0,1)),
  d=rnd(i+1.);
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}
float fbm(vec2 p) {
  float t=.0, a=1.; mat2 m=mat2(1.,-.5,.2,1.2);
  for (int i=0; i<5; i++) {
    t+=a*noise(p);
    p*=2.*m;
    a*=.5;
  }
  return t;
}
float clouds(vec2 p) {
	float d=1., t=.0;
	for (float i=.0; i<3.; i++) {
		float a=d*fbm(i*10.+p.x*.2+.2*(1.+i)*p.y+d+i*i+p);
		t=mix(t,d,a);
		d=a;
		p*=2./(i+1.);
	}
	return t;
}
void main(void) {
	vec2 uv=(FC-.5*R)/MN,st=uv*vec2(2,1);
	vec3 col=vec3(0);
	float bg=clouds(vec2(st.x+T*.5,-st.y));
	uv*=1.-.3*(sin(T*.2)*.5+.5);
	for (float i=1.; i<12.; i++) {
		uv+=.1*cos(i*vec2(.1+.01*i, .8)+i*i+T*.5+.1*uv.x);
		vec2 p=uv;
		float d=length(p);
		col+=.00125/d*(cos(sin(i)*vec3(1.4,.9,2.6))+1.);
		float b=noise(i+p+bg*1.731);
		col+=.002*b/length(max(p,vec2(b*p.x*.02,p.y)));
		col=mix(col,vec3(bg*.20,bg*.10,bg*.42),d);
	}
	O=vec4(col,1);
}`;
  const VERT = `#version 300 es
precision highp float;
in vec4 position;
void main(){gl_Position=position;}`;

  let gl = null;
  try {
    gl = cv.getContext("webgl2");
  } catch (e) { gl = null; }
  if (!gl) { cv.remove(); return; }

  function compile(type, src) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      throw new Error("Shader: " + gl.getShaderInfoLog(s));
    }
    return s;
  }

  let prog = null;
  try {
    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error("link");
  } catch (e) { cv.remove(); return; }
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]), gl.STATIC_DRAW);
  const posLoc = gl.getAttribLocation(prog, "position");
  gl.enableVertexAttribArray(posLoc);
  gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);
  const uRes = gl.getUniformLocation(prog, "resolution");
  const uTime = gl.getUniformLocation(prog, "time");
  const uMove = gl.getUniformLocation(prog, "move");
  const uTouch = gl.getUniformLocation(prog, "touch");
  const uCount = gl.getUniformLocation(prog, "pointerCount");
  const uPtrs = gl.getUniformLocation(prog, "pointers");

  const pointers = new Map();
  let moves = [0, 0];
  let lastCoords = [0, 0];
  const host = hero || cv.parentElement;

  function toGL(x, y) {
    const r = cv.getBoundingClientRect();
    const dpr = Math.max(1, 0.5 * (window.devicePixelRatio || 1));
    return [x * dpr, cv.height - y * dpr];
  }

  function sizeCanvas() {
    const r = (hero || cv.parentElement).getBoundingClientRect();
    if (!r.width || !r.height) return false;
    const dpr = Math.max(1, 0.5 * (window.devicePixelRatio || 1));
    const w = Math.round(r.width * dpr), h = Math.round(r.height * dpr);
    if (cv.width !== w || cv.height !== h) { cv.width = w; cv.height = h; }
    gl.viewport(0, 0, cv.width, cv.height);
    return true;
  }

  if (host) {
    host.addEventListener("pointerdown", (e) => {
      const r = cv.getBoundingClientRect();
      pointers.set(e.pointerId, toGL(e.clientX - r.left, e.clientY - r.top));
    });
    const release = (e) => {
      if (pointers.size === 1) {
        const v = pointers.values().next().value;
        if (v) lastCoords = v;
      }
      pointers.delete(e.pointerId);
    };
    host.addEventListener("pointerup", release);
    host.addEventListener("pointerleave", release);
    host.addEventListener("pointermove", (e) => {
      if (!pointers.size) return;
      const r = cv.getBoundingClientRect();
      lastCoords = [e.clientX, e.clientY];
      pointers.set(e.pointerId, toGL(e.clientX - r.left, e.clientY - r.top));
      moves = [moves[0] + (e.movementX || 0), moves[1] + (e.movementY || 0)];
    }, { passive: true });
  }

  let raf = 0, running = false, visible = true, t0 = 0;
  function render(now) {
    const coords = pointers.size > 0 ? Array.from(pointers.values()).flat() : [0, 0];
    const first = pointers.size > 0 ? pointers.values().next().value : lastCoords;
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.uniform2f(uRes, cv.width, cv.height);
    gl.uniform1f(uTime, now * 1e-3);
    gl.uniform2f(uMove, moves[0], moves[1]);
    gl.uniform2f(uTouch, first[0] || 0, first[1] || 0);
    gl.uniform1i(uCount, pointers.size);
    const flat = new Float32Array(20);
    for (let i = 0; i < Math.min(10, coords.length / 2); i++) {
      flat[i * 2] = coords[i * 2] || 0;
      flat[i * 2 + 1] = coords[i * 2 + 1] || 0;
    }
    gl.uniform2fv(uPtrs, flat);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
  function frame(now) {
    render(now);
    if (running) raf = requestAnimationFrame(frame);
  }
  function start() {
    if (running || !visible) return;
    if (reduced) { if (sizeCanvas()) render(t0); return; }
    if (!sizeCanvas()) return;
    running = true;
    raf = requestAnimationFrame(frame);
  }
  function stop() {
    running = false;
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
  }

  if (hero && "IntersectionObserver" in window) {
    new IntersectionObserver((es) => {
      visible = es[0].isIntersecting;
      if (visible) start(); else stop();
    }, { threshold: 0.02 }).observe(hero);
  }
  window.addEventListener("resize", () => { if (running) sizeCanvas(); else start(); }, { passive: true });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
    else start();
  });
  cv.addEventListener("webglcontextlost", (e) => { e.preventDefault(); stop(); cv.remove(); });
  start();
})();
