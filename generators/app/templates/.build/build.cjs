const { build } = require("esbuild");
const { build: viteBuild } = require("vite");
const getConfig = require("../build.cjs")

/**
 * Build the web and server parts separately:
 * - Web: Vite
 * - Server: esbuild
 */
async function buildApp() {
    const conf = await getConfig();
    await viteBuild(conf.web);
    await build(conf.server.esbuildOptions);
}

buildApp();
