#!/usr/bin/env node
import { createEnv } from "yeoman-environment";
import { parseArgs } from "node:util";

/**
 * @type {import("node:util").ParseArgsConfig["options"]}
 */
const options = {
  name: {
    type: "string",
    short: "n",
  },
  description: {
    type: "string",
    short: "d",
  },
};

async function main() {
  const env = createEnv();
  const { values } = parseArgs({
    options,
    args: process.argv.slice(2),
  });

  await env.lookup();
  try {
    await env.run(["create-lean-jsx-app"], {
      name: values.name,
      description: values.description,
    });
    console.log("Generation complete.");
  } catch (err) {
    console.error("Error while generating:", err);
  }
}

void main();
