/* QR Kat · fondo Aether Flow: partículas de luz que fluyen, se conectan
   y reaccionan al cursor. Vanilla canvas, sin dependencias. */
(() => {
  const cv = document.getElementById("qrAether");
  if (!cv) return;
  const ctx = cv.getContext("2d");
  if (!ctx) return;
  const reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const COLORS = ["139,92,246", "245,165,36", "196,181,253", "125,211,252"];
  let W = 0, H = 0, pts = [], raf = 0, running = false;
  const mouse = { x: -9999, y: -9999 };

  function resize() {
    const r = cv.parentElement.getBoundingClientRect();
    if (!r.width || !r.height) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    W = r.width; H = r.height;
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    seed();
    if (reduced) drawOnce();
  }

  function seed() {
    const n = Math.max(24, Math.min(85, Math.round((W * H) / 9500)));
    pts = Array.from({ length: n }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.6 + 0.7,
      c: COLORS[(Math.random() * COLORS.length) | 0],
      o: Math.random() * 0.5 + 0.35,
    }));
  }

  function frame(t) {
    ctx.clearRect(0, 0, W, H);
    const R = W < 500 ? 95 : 125;
    ctx.lineWidth = 1;
    for (let i = 0; i < pts.length; i++) {
      const a = pts[i];
      for (let j = i + 1; j < pts.length; j++) {
        const b = pts[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        if (Math.abs(dx) > R || Math.abs(dy) > R) continue;
        const d = Math.hypot(dx, dy);
        if (d < R) {
          ctx.strokeStyle = `rgba(139,92,246,${((1 - d / R) * 0.3).toFixed(3)})`;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
    }
    const swirl = t / 2600;
    for (const p of pts) {
      const dx = p.x - mouse.x, dy = p.y - mouse.y;
      const d = Math.hypot(dx, dy) || 1;
      if (d < 150) {
        const f = ((150 - d) / 150) * 0.55;
        p.vx += (dx / d) * f * 0.06;
        p.vy += (dy / d) * f * 0.06;
      }
      p.vx += Math.sin(p.y / 110 + swirl) * 0.0035;
      p.vy += Math.cos(p.x / 130 + swirl * 1.2) * 0.0035;
      p.vx *= 0.986; p.vy *= 0.986;
      p.x += p.vx; p.y += p.vy;
      if (p.x < -12) p.x = W + 12; if (p.x > W + 12) p.x = -12;
      if (p.y < -12) p.y = H + 12; if (p.y > H + 12) p.y = -12;
      ctx.fillStyle = `rgba(${p.c},${p.o.toFixed(2)})`;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7); ctx.fill();
    }
  }

  function loop(t) {
    frame(t || 0);
    if (running) raf = requestAnimationFrame(loop);
  }

  function drawOnce() {
    if (!pts.length) seed();
    frame(1200);
  }

  function start() {
    if (running) return;
    if (reduced) { drawOnce(); return; }
    running = true;
    raf = requestAnimationFrame(loop);
  }

  function stop() {
    running = false;
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
  }

  window.__qrAether = { start, stop };

  window.addEventListener("resize", resize, { passive: true });
  const landing = document.getElementById("qrLanding");
  if (landing) {
    landing.addEventListener("pointermove", (e) => {
      const r = cv.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    }, { passive: true });
    landing.addEventListener("pointerleave", () => { mouse.x = -9999; mouse.y = -9999; }, { passive: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => { resize(); start(); });
  } else { resize(); start(); }
})();
