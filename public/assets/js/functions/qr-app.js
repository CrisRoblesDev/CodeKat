/* QR Kat · lógica del generador (vanilla). Requiere global QRCodeStyling (CDN). */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  const state = {
    view: "landing", step: 0,
    type: "url", text: "https://codekat.store",
    ssid: "", wifiPass: "", wifiEnc: "WPA",
    ecc: "M", dotColor: "#8b5cf6", bgColor: "#ffffff",
    gradient: true, gradColor: "#f5a524",
    dots: "rounded", corners: "extra-rounded",
    logo: null, frame: "card", size: 1024, margin: 12,
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
      qr = new QRCodeStyling({ width: 300, height: 300, type: "canvas", data: payload(), image: undefined, dotsOptions: {}, cornersSquareOptions: {}, cornersDotOptions: {}, backgroundOptions: {}, imageOptions: {} });
      qr.append(preview);
    }
    return true;
  }

  function apply() {
    if (!ensureQr()) return;
    const dotsType = { square: "square", dots: "dots", rounded: "rounded", "extra-rounded": "extra-rounded" }[state.dots] || "rounded";
    const cornerSq = { square: "square", rounded: "rounded", "extra-rounded": "extra-rounded" }[state.corners] || "extra-rounded";
    qr.update({
      data: payload(),
      image: state.logo || undefined,
      dotsOptions: {
        type: dotsType,
        color: state.dotColor,
        ...(state.gradient ? { gradient: { type: "linear", rotation: 45, colorStops: [{ offset: 0, color: state.dotColor }, { offset: 1, color: state.gradColor }] } } : {}),
      },
      cornersSquareOptions: { type: cornerSq, color: state.dotColor },
      cornersDotOptions: { type: "dot", color: state.dotColor },
      backgroundOptions: { color: state.bgColor },
      imageOptions: { crossOrigin: "anonymous", margin: 6, imageSize: 0.42 },
      qrOptions: { errorCorrectionLevel: state.ecc },
    });
    preview.classList.remove("pop"); void preview.offsetWidth; preview.classList.add("pop");
    setStatus(`${payload().length} caracteres · ECC-${state.ecc}`);
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
    const color = (id, key) => $("#" + id)?.addEventListener("input", (e) => { state[key] = e.target.value; schedule(); });
    color("qrDot", "dotColor"); color("qrBg", "bgColor"); color("qrGrad", "gradColor");
    $("#qrGradient")?.addEventListener("change", (e) => { state.gradient = e.target.checked; schedule(); });
    const opts = (sel, key) => $$("#" + sel + " button").forEach(b => b.addEventListener("click", () => {
      state[key] = b.dataset.v; $$("#" + sel + " button").forEach(x => x.classList.toggle("on", x === b)); schedule();
    }));
    opts("qrDots", "dots"); opts("qrCorners", "corners");
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

    /* descargas */
    $("#qrDownload")?.addEventListener("click", () => {
      if (!ensureQr()) return;
      const ext = $("#qrFormat")?.value || "png";
      qr.download({ name: "qr-kat", extension: ext }).catch(() => setStatus("No se pudo descargar."));
    });
    $$("#qrFmtSeg button").forEach(b => b.addEventListener("click", () => {
      $$("#qrFmtSeg button").forEach(x => x.classList.toggle("on", x === b));
      $("#qrFormat").value = b.dataset.fmt;
    }));
    $("#qrPng")?.addEventListener("click", () => { if (ensureQr()) qr.download({ name: "qr-kat", extension: "png" }).catch(() => setStatus("No se pudo descargar.")); });
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

  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", () => { bind(); goStep(0); }) : (bind(), goStep(0));
})();
