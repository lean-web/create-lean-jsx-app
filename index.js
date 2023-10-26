#!/usr/bin/env node
import { createEnv } from "yeoman-environment";
const env = createEnv();

env.lookup();

env.run("create-lean-jsx-app", {}, err => {
    if (err) {
        console.error("Error while generating:", err);
    } else {
        console.log("Generation complete.");
    }
});
