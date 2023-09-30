import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: [
        "tsparticles",
        "tsparticles/Plugins/PolygonMask/Enums",
        "tsparticles/Options/Classes/Options",
        "tsparticles/Enums",
        "tsparticles/Plugins/Absorbers/Enums",
        "tsparticles/Plugins/Emitters/Enums",
      ],
    },
  },
});
