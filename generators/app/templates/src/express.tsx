import express from "express";
import bodyParser from "body-parser";
import compression from "compression";
import { parseQueryParams } from "@/context";
import { App } from "@/components/app";
import { DynamicMessage } from "@/components/slow";
import LeanEngine from "./engine";
import { shouldCompress } from "lean-jsx/lib/server";

/**
 * Output path for the "public" resources:
 * Default output: / (relative to the server script)
 * Includes all resources from the "public" directory.
 */
const PUBLIC_PATH = __dirname;

/**
 * Content-Security-Policy.
 *
 * Set a basic CSP, allowing inline execution of scripts (required by lean.jsx).
 */
const CSP = `default-src 'none'; script-src 'self' 'unsafe-inline'; connect-src 'self'; img-src 'self'; style-src 'self' 'unsafe-inline';base-uri 'self';form-action 'self'`;

/**
 * Create the Express Server
 */
function createServer() {
    const logger = LeanEngine.logger({
        defaultLogLevel: "info"
    });
    const app = express();
    /**
     * Parse request parameters.
     */
    app.use(bodyParser.urlencoded({ extended: true }));

    /**
     * Enable gzip compression for static resources.
     */
    app.use(
        compression({
            filter: shouldCompress
        })
    );

    /**
     * Expose all files in ./dist as resources
     */
    app.use(
        "/",
        express.static(PUBLIC_PATH, {
            index: false,
            maxAge: "30d",
            dotfiles: "ignore"
        })
    );

    /**
     * Configure the lean.jsx middleware:
     */
    app.use(
        LeanEngine.middleware({
            components: [DynamicMessage],
            /**
             * Set custom response attributes.
             * @param resp - the server response, before streaming
             *  the page content to the browser.
             * @returns  - the configured response
             */
            configResponse: resp => resp.set("Content-Security-Policy", CSP),
            globalContextParser: args => parseQueryParams(args)
        })
    );

    /**
     * Home page
     */
    app.use("/", async (req, res) => {
        const globalContext = parseQueryParams(req);

        await LeanEngine.renderWithTemplate(
            res
                .set("Content-Security-Policy", CSP)
                .set("Transfer-Encoding", "chunked"),
            // Return JSX component directly! :)
            <App />,
            globalContext,
            {
                templateName: "index"
            }
        );
    });

    logger.info("Listening in port 5173");
    app.listen(5173);
}

createServer();
