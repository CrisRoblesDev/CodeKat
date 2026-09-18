# Spec: QR Kat — Generador QR hiper-personalizado (CodeKat)

> Skills aplicadas (herramienta `skill` no disponible en este entorno —`ripgrep execution failed`—,
> workflows seguidos por lectura directa): `spec-driven-development`, `ui-ux-pro-max`,
> `frontend-ui-engineering`, `motion-design`, `incremental-implementation`.

## ASSUMPTIONS

1. Ruta nueva `/qr/` en CodeKat, no se toca `/`, `/cotizador/`, `/remuneracion/`.
2. Todo client-side: librería `qr-code-styling@1.6` por CDN (sin nueva dep npm → build no se rompe en Android/proot).
3. Uso principal móvil → shell `100dvh`, sin scroll vertical de página; paneles internos conmutan.
4. Landing primero (vista 0) → generador (vista 1) en la misma ruta, transición animada.

## Objective

Página `/qr/` que:
- Muestra una **landing compacta** (qué es, 3 beneficios, CTA "Crear mi QR") sin scroll.
- Al pulsar CTA abre el **menú de generación** en 3 pasos horizontales: 1 Contenido · 2 Diseño · 3 Descargar.
- Genera QR **hiper-personalizado pero fácil**: texto/URL/WiFi, color + degradado, forma de puntos,
  forma de esquinas, logo propio, marco, tamaño, descarga PNG/SVG, copiar.
- Funciona con una mano en móvil: targets ≥44px, preview siempre visible, footer de pasos fijo.

## Tech Stack

- Astro 5.16.9 (prerender), `BaseLayout`, `@astrojs/cloudflare` server output.
- CSS propio: `/assets/css/pages/qr.css` (reusa variables de `generador.css`: `--bg #08080D`, `--purple #8B5CF6`, `--amb #F5A524`).
- JS propio: `/assets/js/functions/qr-app.js` (vanilla, sin framework).
- CDN runtime: `https://unpkg.com/qr-code-styling@1.6.0/lib/qr-code-styling.js` (global `QRCodeStyling`).

## Commands

```
Dev:   npm run dev        (dentro de CodeKat/)
Build: npm run build
Check: npm run check
```

## Project Structure

```
CodeKat/
  SPEC-qr.md
  src/pages/qr.astro                 → landing (vista 0) + generador (vista 1)
  public/assets/css/pages/qr.css     → shell 100dvh, sin scroll, wizard, preview
  public/assets/js/functions/qr-app.js → estado, pasos, render QR, descargas
```

## Code Style

- Seguir patrón `cotizador.astro`/`remuneracion.astro`: `BaseLayout` + `slot="pre-main"` intro + `slot="after-footer"` nada extra.
- Vanilla JS con un objeto `state`, funciones `render/step/download`, sin dependencias salvo CDN QR.
- Ejemplo de convención: IDs en camelCase (`qrText`, `dotColor`), clases prefijo `qr-`.

## Testing Strategy

- Manual + build: `npm run build` debe pasar.
- Checklist funcional: escribir URL → ver preview <1s; cambiar color/forma → preview cambia;
  subir logo → aparece al centro; PNG descarga; SVG descarga; WiFi arma string `WIFI:T:...`;
  en viewport 360x740 no hay scroll vertical de `body`.
- Accesibilidad: tabs con `role=tablist`, foco visible, contraste ≥4.5:1, `prefers-reduced-motion`.

## Boundaries

- Always: targets ≥44px, foco visible, validar texto no vacío antes de render, `alt`/aria en preview.
- Ask first: agregar dependencia npm, tocar `BaseLayout`, cambiar menú global.
- Never: scroll vertical de página en móvil, emojis como iconos (usar FontAwesome), exponer datos privados.

## Success Criteria

- [ ] `/qr/` existe, prerender, con landing + CTA que abre el generador sin navegar.
- [ ] 3 pasos: contenido (URL/texto/WiFi) / diseño (9+ controles) / descargar (PNG/SVG/copiar).
- [ ] ≥8 personalizaciones: color, degradado on/off, 2º color, estilo puntos (4), estilo esquinas (3),
      logo upload, marco, tamaño, corrección de errores.
- [ ] En 360×740 no hay scroll de body; paneles conmutan con animación ≤400ms.
- [ ] `npm run build` verde.

## Open Questions

- Ninguna bloqueante. Futuro: guardar diseños en localStorage, presets CodeKat.

---

## Design System — QR Kat (ui-ux-pro-max, sin Python en entorno → razonado manual)

| Capa | Decisión |
|---|---|
| PATTERN | Hero-Centric compacto (landing) + Wizard 3 pasos (generador). Preview fijo arriba en móvil. |
| STYLE | Premium dark glass CodeKat. Superficies `rgba(23,23,31,.55)`, bordes violeta 14%, glow violeta. |
| COLORS | bg `#08080D` · panel `#101018` · primario `#8B5CF6` · primario-claro `#C4B5FD` · acento `#F5A524` · texto `#E9EBF2` · dim `#9AA2B5`. QR default puntos `#8B5CF6` sobre blanco para escaneabilidad. |
| TYPOGRAPHY | Outfit (display) + Geist (body), ya cargadas en CodeKat. H1 1.5rem móvil. |
| KEY EFFECTS | Slide horizontal entre pasos 280ms `cubic-bezier(.2,.7,.2,1)`; CTA con gradiente animado; preview con pop 200ms al regenerar. Máx 3 elementos animados a la vez. `prefers-reduced-motion` → sin animación. |
| AVOID | Scroll vertical · targets <44px · degradados morado/rosa IA como fondo de página · contraste bajo en labels · auto-descargas sin gesto. |
| PRE-DELIVERY | [ ] Sin scroll body 360×740 · [ ] Contraste 4.5:1 · [ ] Foco visible · [ ] `cursor:pointer` en clicables · [ ] SVG/PNG descargan · [ ] QR escanea (test con cámara). |

## Motion (motion-design — arquetipo Corporate/Premium)

- Entrada vistas: `translateX(24px)+opacity` 280ms decelerate; salida 200ms accelerate.
- Micro-interacciones botones: scale `.97` al active, 150ms.
- Stagger del wizard: dots de pasos con delay 40ms c/u.
- Capas: primaria (panel), secundaria (sombra del QR), ambiente (aurora existente de CodeKat).
