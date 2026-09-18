/* QR Kat · lógica del generador (vanilla). Requiere global QRCodeStyling (CDN). */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  const state = {
    view: "landing", step: 0,
    type: "url", text: "https://codekat.store",
    ssid: "", wifiPass: "", wifiEnc: "WPA",
    ecc: "M", dotColor: "#8b5cf6", bgColor: "#ffffff",
    gradient: true, gradType: "linear", gradColor: "#f5a524",
    dots: "rounded", corners: "extra-rounded", cornersDot: "dot",
    logo: null, frame: "card", size: 1024, margin: 12,
    cardTitle: "", cardSub: "", net1: "ig", handle1: "", net2: "tt", handle2: "",
    cardStyle: "marca", cardBg1: "#8b5cf6", cardBg2: "#f5a524",
  };

  const PRESETS = {
    codekat: { dotColor: "#8b5cf6", bgColor: "#ffffff", gradient: true, gradType: "linear", gradColor: "#f5a524", dots: "rounded", corners: "extra-rounded", cornersDot: "dot" },
    ocean:   { dotColor: "#0ea5e9", bgColor: "#ffffff", gradient: true, gradType: "linear", gradColor: "#6366f1", dots: "extra-rounded", corners: "extra-rounded", cornersDot: "dot" },
    sunset:  { dotColor: "#f43f5e", bgColor: "#ffffff", gradient: true, gradType: "radial", gradColor: "#f59e0b", dots: "dots", corners: "dot", cornersDot: "dot" },
    selva:   { dotColor: "#16a34a", bgColor: "#ffffff", gradient: true, gradType: "linear", gradColor: "#84cc16", dots: "classy-rounded", corners: "extra-rounded", cornersDot: "square" },
    mono:    { dotColor: "#111111", bgColor: "#ffffff", gradient: false, gradType: "linear", gradColor: "#6b7280", dots: "square", corners: "square", cornersDot: "square" },
    vino:    { dotColor: "#7c2d12", bgColor: "#ffffff", gradient: true, gradType: "linear", gradColor: "#db2777", dots: "classy", corners: "extra-rounded", cornersDot: "dot" },
  };

  let qr = null, timer = null;
  const preview = $("#qrPreview"), status = $("#qrStatus");

  const payload = () => {
    if (state.type === "wifi") {
      const enc = state.wifiEnc === "none" ? "nopass" : state.wifiEnc;
      const esc = (v) => String(v).replace(/([\\;,":])/g, "\\$1");
      return `WIFI:T:${enc};S:${esc(state.ssid)};P:${esc(state.wifiPass)};;`;
    }
    return state.text.trim() || "https://codekat.store";
  };

  function setStatus(msg) { if (status) status.textContent = msg; }

  function ensureQr() {
    if (typeof QRCodeStyling === "undefined") {
      setStatus("Sin conexión: no se pudo cargar el motor QR.");
      return false;
    }
    if (!qr) {
      try {
        qr = new QRCodeStyling({ width: 300, height: 300, type: "canvas", data: payload(), image: undefined, dotsOptions: {}, cornersSquareOptions: {}, cornersDotOptions: {}, backgroundOptions: {}, imageOptions: {} });
        qr.append(preview);
      } catch (e) {
        setStatus("El motor QR falló al iniciar.");
        return false;
      }
    }
    return true;
  }

  function fullOptions(px) {
    const dotsType = { square: "square", dots: "dots", rounded: "rounded", "extra-rounded": "extra-rounded", "classy": "classy", "classy-rounded": "classy-rounded" }[state.dots] || "rounded";
    const cornerSq = { square: "square", dot: "dot", "extra-rounded": "extra-rounded" }[state.corners] || "extra-rounded";
    const cornerDt = { dot: "dot", square: "square" }[state.cornersDot] || "dot";
    return {
      width: px, height: px, data: payload(), margin: state.margin,
      image: state.logo || undefined,
      dotsOptions: {
        type: dotsType,
        color: state.dotColor,
        ...(state.gradient ? { gradient: { type: state.gradType, rotation: 45, colorStops: [{ offset: 0, color: state.dotColor }, { offset: 1, color: state.gradColor }] } } : {}),
      },
      cornersSquareOptions: { type: cornerSq, color: state.dotColor },
      cornersDotOptions: { type: cornerDt, color: state.dotColor },
      backgroundOptions: { color: state.bgColor },
      imageOptions: { crossOrigin: "anonymous", margin: 6, imageSize: 0.42 },
      qrOptions: { errorCorrectionLevel: state.ecc },
    };
  }

  function apply() {
    if (!ensureQr()) return;
    try {
      qr.update(fullOptions(300));
    } catch (e) {
      setStatus("No se pudo actualizar el QR.");
      return;
    }
    preview.classList.remove("pop"); void preview.offsetWidth; preview.classList.add("pop");
    setStatus(`${payload().length} caracteres · ECC-${state.ecc}`);
    updateMini();
  }

  const schedule = () => { clearTimeout(timer); timer = setTimeout(apply, 280); };

  /* ----- vistas ----- */
  function showView(v) {
    state.view = v;
    const l = $("#qrLanding"), a = $("#qrApp");
    if (v === "app") {
      a.hidden = false;
      l.classList.remove("on"); l.classList.add("off-left");
      a.classList.add("on"); ensureQr(); apply();
    } else {
      a.classList.remove("on"); l.classList.remove("off-left"); l.classList.add("on");
    }
  }

  /* ----- pasos ----- */
  function goStep(n) {
    state.step = Math.max(0, Math.min(2, n));
    $$(".qr-tabs button").forEach((b, i) => { b.classList.toggle("on", i === state.step); b.setAttribute("aria-selected", i === state.step); });
    $$(".qr-panel").forEach((p, i) => {
      p.classList.toggle("on", i === state.step);
      p.classList.toggle("off-left", i < state.step);
    });
    $("#stepNow").textContent = state.step + 1;
    $("#qrBar").style.width = ((state.step + 1) / 3 * 100) + "%";
  }

  function bind() {
    $("#qrStart")?.addEventListener("click", () => showView("app"));
    $("#qrBack")?.addEventListener("click", () => showView("landing"));
    $("#qrReset")?.addEventListener("click", () => { state.logo = null; apply(); setStatus("Diseño restablecido."); });
    $("#qrPrev")?.addEventListener("click", () => goStep(state.step - 1));
    $("#qrNext")?.addEventListener("click", () => goStep(state.step + 1));
    $$(".qr-tabs button").forEach(b => b.addEventListener("click", () => goStep(+b.dataset.step)));

    /* tipo contenido */
    $$("#qrType button").forEach(b => b.addEventListener("click", () => {
      state.type = b.dataset.type;
      $$("#qrType button").forEach(x => x.classList.toggle("on", x === b));
      $("#qrTextWrap").hidden = state.type === "wifi";
      $("#qrWifiWrap").hidden = state.type !== "wifi";
      $("#qrText").placeholder = state.type === "url" ? "https://tu-negocio.cl" : "Escribe el texto del QR…";
      schedule();
    }));
    $("#qrText")?.addEventListener("input", (e) => {
      state.text = e.target.value;
      $("#qrCount").textContent = `${state.text.length} caracteres`;
      schedule();
    });
    ["qrSsid", "qrWifiPass", "qrWifiEnc", "qrEcc"].forEach(id => {
      $("#" + id)?.addEventListener("input", (e) => {
        if (id === "qrSsid") state.ssid = e.target.value;
        if (id === "qrWifiPass") state.wifiPass = e.target.value;
        if (id === "qrWifiEnc") state.wifiEnc = e.target.value;
        if (id === "qrEcc") state.ecc = e.target.value;
        schedule();
      });
    });

    /* diseño */
    const markOn = (sel, attr, val) => $$("#" + sel + " button").forEach(x => x.classList.toggle("on", x.dataset[attr] === val));
    const syncUI = () => {
      const set = (id, v) => { const el = $("#" + id); if (el) el.value = v; };
      set("qrDot", state.dotColor); set("qrBg", state.bgColor); set("qrGrad", state.gradColor);
      const g = $("#qrGradient"); if (g) g.checked = state.gradient;
      markOn("qrDots", "v", state.dots); markOn("qrCorners", "v", state.corners);
      markOn("qrCornerDots", "v", state.cornersDot); markOn("qrGradType", "g", state.gradType);
    };
    $$("#qrPresets button").forEach(b => b.addEventListener("click", () => {
      Object.assign(state, PRESETS[b.dataset.p] || PRESETS.codekat);
      $$("#qrPresets button").forEach(x => x.classList.toggle("on", x === b));
      syncUI(); schedule(); setStatus("Tema aplicado.");
    }));
    $$("#qrGradType button").forEach(b => b.addEventListener("click", () => {
      state.gradType = b.dataset.g;
      $$("#qrGradType button").forEach(x => x.classList.toggle("on", x === b));
      schedule();
    }));
    const color = (id, key) => $("#" + id)?.addEventListener("input", (e) => { state[key] = e.target.value; schedule(); });
    color("qrDot", "dotColor"); color("qrBg", "bgColor"); color("qrGrad", "gradColor");
    const swatch = (sel, key, inputId) => $$("#" + sel + " button").forEach(b => b.addEventListener("click", () => {
      state[key] = b.dataset.c;
      const el = $("#" + inputId); if (el) el.value = b.dataset.c;
      $$("#" + sel + " button").forEach(x => x.classList.toggle("on", x === b));
      schedule();
    }));
    swatch("qrDotSw", "dotColor", "qrDot"); swatch("qrBgSw", "bgColor", "qrBg");
    $("#qrGradient")?.addEventListener("change", (e) => { state.gradient = e.target.checked; schedule(); });
    const opts = (sel, key) => $$("#" + sel + " button").forEach(b => b.addEventListener("click", () => {
      state[key] = b.dataset.v; $$("#" + sel + " button").forEach(x => x.classList.toggle("on", x === b)); schedule();
    }));
    opts("qrDots", "dots"); opts("qrCorners", "corners"); opts("qrCornerDots", "cornersDot");
    $$("#qrFrame button").forEach(b => b.addEventListener("click", () => {
      state.frame = b.dataset.v;
      $$("#qrFrame button").forEach(x => x.classList.toggle("on", x === b));
      preview.dataset.frame = state.frame;
    }));
    $("#qrSize")?.addEventListener("input", (e) => { state.size = +e.target.value; $("#qrSizeVal").textContent = e.target.value + "px"; });
    $("#qrMargin")?.addEventListener("input", (e) => { state.margin = +e.target.value; $("#qrMarginVal").textContent = e.target.value; schedule(); });
    $("#qrLogo")?.addEventListener("change", (e) => {
      const f = e.target.files?.[0]; if (!f) return;
      const r = new FileReader();
      r.onload = () => { state.logo = r.result; schedule(); setStatus("Logo aplicado al centro."); };
      r.readAsDataURL(f);
    });
    $("#qrNoLogo")?.addEventListener("click", () => { state.logo = null; const i = $("#qrLogo"); if (i) i.value = ""; schedule(); });

    /* descargas (siempre al tamaño elegido, instancia temporal de exportación) */
    const fileName = () => {
      const el = $("#qrFileName");
      const v = (el ? el.value : "").replace(/[^\w\-áéíóúñü ]+/gi, "").trim().replace(/\s+/g, "-");
      return v || "qr-kat";
    };
    async function exportQr(ext) {
      if (!ensureQr()) return;
      setStatus("Generando archivo en alta calidad…");
      try {
        const inst = new QRCodeStyling({ ...fullOptions(state.size), type: ext === "svg" ? "svg" : "canvas" });
        await inst.download({ name: fileName(), extension: ext });
        setStatus(`Descargado en ${state.size}px.`);
      } catch (e) {
        try {
          await qr.download({ name: fileName(), extension: ext });
          setStatus("Descargado (calidad estándar).");
        } catch (e2) { setStatus("No se pudo descargar: " + (e2?.message || e2)); }
      }
    }
    $("#qrDownload")?.addEventListener("click", () => exportQr($("#qrFormat")?.value || "png"));
    $$("#qrFmtSeg button").forEach(b => b.addEventListener("click", () => {
      $$("#qrFmtSeg button").forEach(x => x.classList.toggle("on", x === b));
      $("#qrFormat").value = b.dataset.fmt;
    }));
    [["qrCardTitle", "cardTitle"], ["qrCardSub", "cardSub"], ["qrHandle1", "handle1"], ["qrHandle2", "handle2"]].forEach(([id, key]) => {
      $("#" + id)?.addEventListener("input", (e) => { state[key] = e.target.value; updateMini(); });
    });
    [["qrNet1", "net1"], ["qrNet2", "net2"]].forEach(([id, key]) => {
      $("#" + id)?.addEventListener("change", (e) => { state[key] = e.target.value; updateMini(); });
    });
    color("qrCardBg1", "cardBg1"); color("qrCardBg2", "cardBg2");
    $("#qrCardBg1")?.addEventListener("input", updateMini);
    $("#qrCardBg2")?.addEventListener("input", updateMini);
    $$("#qrCardSeg button").forEach(b => b.addEventListener("click", () => {
      $$("#qrCardSeg button").forEach(x => x.classList.toggle("on", x === b));
      state.cardStyle = b.dataset.card;
      const h = $("#qrCardStyle"); if (h) h.value = b.dataset.card;
      const c = $("#qrCardCustom"); if (c) c.hidden = b.dataset.card !== "custom";
      updateMini();
    }));
    $("#qrCardDownload")?.addEventListener("click", downloadCard);
    $("#qrPng")?.addEventListener("click", () => exportQr("png"));
    const copyText = async () => {
      try { await navigator.clipboard.writeText(payload()); setStatus("Contenido copiado."); }
      catch { setStatus("No se pudo copiar."); }
    };
    $("#qrCopy")?.addEventListener("click", copyText);
    $("#qrCopyText")?.addEventListener("click", copyText);
    $("#qrCopyImg")?.addEventListener("click", async () => {
      if (!ensureQr()) return;
      try {
        const blob = await qr.getRawData("png");
        await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
        setStatus("Imagen copiada.");
      } catch { setStatus("Tu navegador no permite copiar imagen."); }
    });
  }

  /* PNG del QR en alta: temporal 1024 -> SVG rasterizado -> preview.
     Triple intento para que la tarjeta siempre pueda armarse. */
  async function qrPngBlob(px) {
    try {
      const hi = new QRCodeStyling({ ...fullOptions(px), type: "canvas" });
      return await hi.getRawData("png");
    } catch (e1) {
      try {
        const sv = new QRCodeStyling({ ...fullOptions(px), type: "svg" });
        const svgBlob = await sv.getRawData("svg");
        const url = URL.createObjectURL(svgBlob);
        try {
          const img = new Image();
          img.decoding = "sync";
          await new Promise((res, rej) => { img.onload = res; img.onerror = () => rej(new Error("SVG no rasterizo")); img.src = url; });
          const cv = document.createElement("canvas");
          cv.width = px; cv.height = px;
          const cx = cv.getContext("2d");
          cx.fillStyle = state.bgColor; cx.fillRect(0, 0, px, px);
          cx.drawImage(img, 0, 0, px, px);
          const out = await new Promise((res, rej) => cv.toBlob(b => (b ? res(b) : rej(new Error("toBlob vacio"))), "image/png"));
          return out;
        } finally { URL.revokeObjectURL(url); }
      } catch (e2) {
        return qr.getRawData("png");
      }
    }
  }

  /* Tarjeta para compartir 1080x1350: textos + redes fuera del QR */
  function rr(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }
  async function blobToBitmap(blob) {
    if (typeof createImageBitmap === "function") return createImageBitmap(blob);
    const url = URL.createObjectURL(blob);
    try {
      const img = new Image();
      img.decoding = "sync";
      await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = url; });
      const cv = document.createElement("canvas");
      cv.width = img.naturalWidth; cv.height = img.naturalHeight;
      cv.getContext("2d").drawImage(img, 0, 0);
      return cv;
    } finally { URL.revokeObjectURL(url); }
  }
  const SOCIALS = { ig: "IG", tt: "TT", wa: "WA", fb: "FB", x: "X", web: "WB" };
  const escHtml = (v) => String(v).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* Mini tarjeta en vivo dentro del preview */
  function updateMini() {
    const m = $("#qrMini");
    if (!m) return;
    const t = $("#qrMiniTitle"), s = $("#qrMiniSub"), n = $("#qrMiniNets");
    const title = (state.cardTitle || "").trim() || "Mi QR";
    const sub = (state.cardSub || "").trim();
    if (t) t.textContent = title;
    if (s) { s.textContent = sub; s.hidden = !sub; }
    const nets = [{ n: state.net1, h: state.handle1 }, { n: state.net2, h: state.handle2 }]
      .filter(x => (x.h || "").trim()).slice(0, 2);
    if (n) {
      n.innerHTML = nets.map(x => `<span>${SOCIALS[x.n] || "IG"} ${escHtml(x.h.trim())}</span>`).join("");
      n.hidden = !nets.length;
    }
    m.dataset.style = state.cardStyle;
    m.style.setProperty("--mk1", state.cardStyle === "custom" ? state.cardBg1 : state.dotColor);
    m.style.setProperty("--mk2", state.cardStyle === "custom" ? state.cardBg2 : (state.gradient ? state.gradColor : state.dotColor));
  }
  async function downloadCard() {
    if (!ensureQr()) return;
    setStatus("Armando tu tarjeta…");
    try {
      const W = 1080, H = 1350;
      const cv = document.createElement("canvas"); cv.width = W; cv.height = H;
      const ctx = cv.getContext("2d");
      const style = $("#qrCardStyle")?.value || "marca";
      const title = ($("#qrCardTitle")?.value || "").trim().slice(0, 60) || "Mi QR";
      const sub = ($("#qrCardSub")?.value || "").trim().slice(0, 90);
      const nets = [1, 2].map(i => ({
        net: $("#qrNet" + i)?.value || "ig",
        handle: ($("#qrHandle" + i)?.value || "").trim().slice(0, 40),
      })).filter(n => n.handle);
      const lum = (hex) => {
        const c = String(hex || "#000000").replace("#", "");
        const f = (i) => parseInt(c.substr(i, 2), 16) / 255;
        return 0.2126 * f(0) + 0.7152 * f(2) + 0.0722 * f(4);
      };
      const palettes = {
        claro: { bg1: "#ffffff", bg2: "#efe9ff", ink: "#1a1a2e", dim: "#5c5875", pill: "rgba(139,92,246,.12)" },
        oscuro: { bg1: "#12121a", bg2: "#241d3d", ink: "#ffffff", dim: "#b9b3d4", pill: "rgba(255,255,255,.10)" },
        marca: { bg1: state.dotColor, bg2: state.gradient ? state.gradColor : state.dotColor, ink: "#ffffff", dim: "rgba(255,255,255,.85)", pill: "rgba(255,255,255,.18)" },
      };
      const cb1 = $("#qrCardBg1")?.value || state.cardBg1, cb2 = $("#qrCardBg2")?.value || state.cardBg2;
      palettes.custom = { bg1: cb1, bg2: cb2, ink: lum(cb1) > 0.55 ? "#1a1a2e" : "#ffffff", dim: lum(cb1) > 0.55 ? "#5c5875" : "rgba(255,255,255,.85)", pill: lum(cb1) > 0.55 ? "rgba(20,20,40,.08)" : "rgba(255,255,255,.18)" };
      const pal = palettes[style] || palettes.marca;
      const bg = ctx.createLinearGradient(0, 0, W, H);
      bg.addColorStop(0, pal.bg1); bg.addColorStop(1, pal.bg2);
      ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
      ctx.textAlign = "center";
      // Título
      ctx.fillStyle = pal.ink;
      ctx.font = "800 72px Outfit, system-ui, sans-serif";
      const words = title.split(" ");
      const lines = [];
      let cur = "";
      for (const w of words) {
        const t = cur ? cur + " " + w : w;
        if (ctx.measureText(t).width > W - 160 && cur) { lines.push(cur); cur = w; }
        else cur = t;
        if (lines.length === 2) break;
      }
      if (cur) lines.push(cur);
      lines.slice(0, 2).forEach((ln, i) => ctx.fillText(ln, W / 2, 190 + i * 84));
      if (sub) {
        ctx.fillStyle = pal.dim;
        ctx.font = "500 42px Outfit, system-ui, sans-serif";
        ctx.fillText(sub, W / 2, 190 + lines.slice(0, 2).length * 84 + 10);
      }
      // QR en alta con triple respaldo (nunca reutiliza el preview chico)
      const blob = await qrPngBlob(1024);
      const bmp = await blobToBitmap(blob);
      const q = 660, qx = (W - q) / 2, qy = 430;
      ctx.save();
      rr(ctx, qx - 28, qy - 28, q + 56, q + 56, 48);
      ctx.fillStyle = "#ffffff";
      ctx.shadowColor = "rgba(0,0,0,.30)"; ctx.shadowBlur = 60; ctx.shadowOffsetY = 18;
      ctx.fill();
      ctx.restore();
      const iw = bmp.width || q, ih = bmp.height || q;
      ctx.drawImage(bmp, qx, qy, q, q * (ih / iw));
      // Redes
      ctx.font = "600 40px Outfit, system-ui, sans-serif";
      nets.slice(0, 2).forEach((n, i) => {
        const y = qy + q + 120 + i * 96;
        const label = `${SOCIALS[n.net] || "IG"}  ${n.handle}`;
        const wpx = Math.min(W - 160, ctx.measureText(label).width + 120);
        rr(ctx, (W - wpx) / 2, y - 58, wpx, 84, 42);
        ctx.fillStyle = pal.pill; ctx.fill();
        ctx.fillStyle = pal.ink;
        ctx.textAlign = "center";
        ctx.fillText(label, W / 2, y);
      });
      // Pie
      ctx.fillStyle = pal.dim;
      ctx.font = "500 32px Outfit, system-ui, sans-serif";
      ctx.fillText("Escanea con tu cámara · Hecho con CodeKat", W / 2, H - 56);
      // Blob + objectURL (los dataURL gigantes fallan en móvil)
      const outBlob = await new Promise((res) => {
        try { cv.toBlob((b) => res(b), "image/png"); }
        catch (e) { res(null); }
      });
      if (!outBlob) throw new Error("navegador bloqueó la imagen (prueba sin logo)");
      const url = URL.createObjectURL(outBlob);
      const a = document.createElement("a");
      a.download = fileName() + "-tarjeta.png";
      a.href = url;
      document.body.appendChild(a); a.click();
      setTimeout(() => { URL.revokeObjectURL(url); a.remove(); }, 5000);
      setStatus("Tarjeta descargada en alta calidad.");
    } catch (e) { setStatus("No se pudo armar la tarjeta: " + (e?.message || e)); }
  }
  function renderDemo() {
    const slot = $("#qrDemoMini");
    if (!slot || typeof QRCodeStyling === "undefined") return;
    try {
      const demo = new QRCodeStyling({
        width: 220, height: 220, type: "svg", margin: 4,
        data: "https://codekat.store/qr/",
        dotsOptions: { type: "extra-rounded", color: "#8b5cf6", gradient: { type: "linear", rotation: 45, colorStops: [{ offset: 0, color: "#8b5cf6" }, { offset: 1, color: "#f5a524" }] } },
        cornersSquareOptions: { type: "extra-rounded", color: "#8b5cf6" },
        cornersDotOptions: { type: "dot", color: "#f5a524" },
        backgroundOptions: { color: "#ffffff" },
        qrOptions: { errorCorrectionLevel: "M" },
      });
      demo.append(slot);
      const fb = $("#qrDemoFallback");
      if (fb) fb.style.display = "none";
    } catch (e) { /* queda el SVG de respaldo */ }
  }

  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", () => { bind(); goStep(0); updateMini(); renderDemo(); }) : (bind(), goStep(0), updateMini(), renderDemo());
})();
