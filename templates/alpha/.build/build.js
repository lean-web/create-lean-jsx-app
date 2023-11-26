import { build } from "esbuild";
import { build as viteBuild } from "vite";
import getConfig from "../build.js";

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
