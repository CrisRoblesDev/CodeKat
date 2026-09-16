// @ts-check
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
export default defineConfig({
  output:"server",
  // platformProxy desactivado en dev Android (workerd incompatible con libc proot).
  // En deploy Cloudflare Workers sigue funcionando igual (solo afecta a `astro dev`).
  adapter: cloudflare({ platformProxy:{enabled:false}}),
  security:{ checkOrigin:false },
});
