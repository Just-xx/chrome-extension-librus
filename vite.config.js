import { defineConfig } from "vite";
import { resolve, basename } from "path";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        popup: resolve(__dirname, "popup/index.html"),
        background: resolve(__dirname, "background/background.js"),
        content: resolve(__dirname, "content/content.js"),
      },
      output: {
        entryFileNames: "[name]/[name].js",
        assetFileNames: assetInfo => {
          const name = assetInfo.names?.[0] || assetInfo.fileName || "[name]";
          if (name.endsWith(".css")) return "css/[name].[ext]";
          return "assets/[name].[ext]";
        },
      },
    },
  },
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: "manifest.json",
          dest: ".",
        },
        {
          src: "assets/",
          dest: ".",
        },
      ],
    }),
  ],
});
