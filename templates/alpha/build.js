import { resolve, basename, extname } from "path";
import vitePlugin from "lean-jsx/plugins/vite";
import esbuildPlugin from "lean-jsx/plugins/esbuild";
import packageJSON from "./package.json" assert { type: "json" };
const { dependencies } = packageJSON;

/**
 * Main build configuration.
 *
 * We build the web and server parts independently to better
 * control the configuration of each:
 *
 * - Web: Bundled with Vite: Allows bundling and processing the
 *      index.html main template.
 * - Server: Bundled with esbuild: Bundles all server code into
 *      a CJS file that can be executed by NodeJS.
 *      It allows us to use JSX directly on the server side.
 *
 * @returns {import("lean-jsx/src/types/build").default}
 */
export default () => {
  // root directory for the source code:
  const root = resolve(process.cwd(), "./src");

  // bundle destination directly:
  const outDir = resolve(process.cwd(), "./dist");

  // main entry point for the server:
  const main = resolve(process.cwd(), "./src/express.tsx");

  // extension map for the bundling of server resources:
  // it uses CommonJS by default for execution in NodeJS.
  const outExtension = {
    ".js": ".cjs",
  };

  /**
   * @type {Record<string, string>}
   */
  const bundledOutExtensionMap = {
    ".tsx": outExtension[".js"],
    ".ts": outExtension[".js"],
    ".js": outExtension[".js"],
  };

  /**  @type {import("lean-jsx/src/types/build").default} */
  const conf = {
    // The Vite configuration for the web part:
    web: {
      root,
      publicDir: resolve(root, "./web/public"),
      build: {
        minify: false,
        outDir,
        assetsDir: "assets",
        emptyOutDir: true,
      },
      plugins: [vitePlugin("lean-jsx")],
    },
    // The configuration for the server part:
    server: {
      // The path to the bundled server script:
      main: resolve(
        outDir,
        basename(main).replace(
          /\.(js|tsx?)/,
          bundledOutExtensionMap[extname(main)],
        ),
      ),
      // The esbuild building configuration:
      esbuildOptions: {
        entryPoints: [main],
        platform: "node",
        bundle: true,
        outdir: resolve(process.cwd(), "./dist"),
        format: "cjs",
        external: [...Object.keys(dependencies), "esbuild"],
        outExtension,
        loader: {
          ".png": "dataurl",
          ".svg": "text",
        },
        plugins: [esbuildPlugin],
      },
    },
  };
  return conf;
};
