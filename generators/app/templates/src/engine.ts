import { buildApp } from "lean-jsx/lib/server";
import path from "path";

const INDEX_HTML_PATH = path.resolve(__dirname, "index.html");

const app = buildApp({
    templates: {
        index: {
            path: INDEX_HTML_PATH,
            contentPlaceholder: "<!--EAGER_CONTENT-->"
        }
    },
    logging: {
        defaultLogLevel: "info"
    }
});

export default app;
