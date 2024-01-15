import nodemon from "nodemon";
import { context } from "esbuild";
import { resolve } from "path";
import { build as viteBuild } from "vite";
import getConfig from "../build.js";

const dist = resolve(process.cwd(), "dist");

const watchedFiles = [`${dist}/express.cjs`];
/**
 *  * Build andthe web and server parts separately, and watch for changes:
 * - Web: Vite
 * - Server: esbuild
 *
 * @returns the path to the bundled server script
 */
async function buildApp() {
  const conf = await getConfig();

  console.log("==Building server==");

  const { esbuildOptions } = conf.server;
  esbuildOptions.sourcemap = true;
  const esbuildContext = await context(esbuildOptions);

  await esbuildContext.rebuild();
  const web = viteBuild({
    ...conf.web,
    build: {
      ...conf.web.build,
      watch: true,
      emptyOutDir: false,
    },
    plugins: [
      ...conf.web.plugins,
      {
        name: "watch-external",
        buildStart() {
          watchedFiles.forEach((f) => this.addWatchFile(f));
        },
      },
    ],
  }).catch((err) => {
    console.error(err);
    process.exit();
  });

  console.log("Server built. Watching for changes...");
  const server = esbuildContext.watch();

  await server;
  await web;

  return conf.server.main;
}

/**
 * Start the server using nodemon for watching changes.
 */
async function startServer() {
  try {
    const main = await buildApp();

    const nodemonServer = nodemon({
      script: main, // The main bundled server script
      ext: "js json ts", // Watched extensions
      env: { NODE_ENV: process.env.NODE_ENV ?? "development" }, // Environment variables
      delay: 500,
      watch: watchedFiles,
      restartable: true,
    });

    nodemonServer
      .on("start", () => {
        console.log("Server has started");
      })
      .on("quit", () => {
        console.log("Server has quit");
        process.exit();
      })
      .on("restart", (files) => {
        console.log("Server restarted due to:", files);
      });
  } catch (err) {
    console.log("Error during build process");
    console.error(err);
    process.exit();
  }
}

startServer();
