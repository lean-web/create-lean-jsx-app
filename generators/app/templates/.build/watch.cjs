const nodemon = require("nodemon");
const { context } = require("esbuild");
const { resolve } = require("path");
const { build: viteBuild } = require("vite");
const getConfig = require("../build.cjs")

const src = resolve(__dirname, '../', 'src')
const dist = resolve(__dirname, '../', 'dist')

/**
 *  * Build andthe web and server parts separately, and watch for changes:
 * - Web: Vite
 * - Server: esbuild
 * 
 * @returns the path to the bundled server script
 */
async function buildApp() {
    const conf = await getConfig();
    console.log(src)
    await viteBuild({
        ...conf.web,
        build: {
            ...conf.web.build,
            watch: {
                include: [`${src}/**`, `${dist}/express.cjs`]
            }
        }
    }).catch((err) => {
        console.error(err);
        process.exit();
    });

    console.log("==Building server==");
    const esbuildContext = await context(conf.server.esbuildOptions);
    esbuildContext.rebuild()
    console.log("Server built. Watching for changes...")
    await esbuildContext.watch()

    return conf.server.main;
}

/**
 * Start the server using nodemon for watching changes.
 */
async function startServer() {
    try {
        const main = await buildApp();

        setTimeout(() => {
            nodemonServer = nodemon({
                script: main, // The main bundled server script
                ext: "js json ts tsx", // Watched extensions
                env: { NODE_ENV: "development" }, // Environment variables
                delay: 1,
                watch: main,
            });

            nodemon
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
        }, 100);
    } catch(err) {
        console.log('Error during build process')
        console.error(err);
        process.exit();
    }
}

startServer();
