const { resolve, basename, extname } = require("path");
const { injectScript } = require("lean-jsx/lib/plugins/vite");
const packageConfig = require("./package.json");

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
 * @returns 
 */
module.exports = async () => {
    // root directory for the source code:
    const root = resolve(__dirname, "./src");

    // bundle destination directly:
    const outDir = resolve(__dirname, "./dist");

    // main entry point for the server:
    const main = resolve(__dirname, "./src/express.tsx");

    // extension map for the bundling of server resources:
    // it uses CommonJS by default for execution in NodeJS.
    const outExtension = {
        ".js": ".cjs"
    };

    const bundledOutExtensionMap = {
        ".tsx": outExtension[".js"],
        ".ts": outExtension[".js"],
        ".js": outExtension[".js"]
    };

    /**  @type {import("lean-jsx/src/types/build").default} */
    const conf = {
        // The Vite configuration for the web part:
        web: {
            root,
            publicDir: resolve(root, "./web/public"),
            build: {
                outDir,
                assetsDir: "assets",
                emptyOutDir: true
            },
            plugins: [injectScript("lean-jsx")]
        },
        // The configuration for the server part:
        server: {
            // The path to the bundled server script:
            main: resolve(
                outDir,
                basename(main).replace(
                    /\.(js|tsx?)/,
                    bundledOutExtensionMap[extname(main)]
                )
            ),
            // The esbuild building configuration:
            esbuildOptions: {
                entryPoints: [main],
                platform: "node",
                bundle: true,
                outdir: resolve(__dirname, "./dist"),
                format: "cjs",
                external: [...Object.keys(packageConfig.dependencies)],
                outExtension,
                loader: {
                    ".png": "dataurl",
                    ".svg": "text"
                }
            }
        }
    };
    return conf;
};
