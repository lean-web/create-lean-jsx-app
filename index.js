#!/usr/bin/env node
const { Command, Option } = require("commander");
const inquirer = require("inquirer");
const fs = require("fs-extra");
const path = require("path");
const { execSync } = require("child_process");
const chalk = require("chalk");

const program = new Command();

const version = "0.0.15-alpha";
const typesVersion = "1.0.4";
const templateVersion = "alpha";

program
  .name("create-lean-jsx-app")
  .description("A project generator for LeanJSX")
  .version("0.0.1")
  .argument("<project-directory>", "Directory to create the project in")
  .addOption(new Option("-n, --name <string>", "The project's name"))
  .addOption(
    new Option("-d, --description <string>", "The project's description"),
  )
  .action(async (projectDirectory, opts) => {
    console.log(
      `\n\nWelcome to the ${chalk.green("LeanJSX")} project generator!\n\n`,
    );
    console.log(
      `Creating project in ${chalk.blue(
        path.resolve(process.cwd(), projectDirectory),
      )}`,
    );
    const responses = await inquirer.prompt([
      {
        type: "input",
        name: "projectName",
        message: "What is your project name?",
        default: path.basename(projectDirectory),
        when: () => !opts.name,
      },
      {
        type: "input",
        name: "projectDescription",
        message: "A description for your project",
        default: "A lean.js-powered web application!",
        when: () => !opts.description,
      },
      // Add more prompts as needed
    ]);

    // Define the path to the template directory
    const templateDir = path.join(__dirname, "templates", templateVersion);

    // Define the target directory path
    const targetDir = path.resolve(process.cwd(), projectDirectory);

    // Ensure the target directory exists and is empty
    if (fs.existsSync(targetDir)) {
      console.error(`The directory ${targetDir} already exists.`);
      process.exit(1);
    }

    // Copy the template directory to the target directory
    fs.copySync(templateDir, targetDir);
    fs.copySync(`${templateDir}/.gitignore`, `${targetDir}/.gitignore`);

    // Replace placeholders in the target directory files
    const filesToReplace = [
      "package.json",
      "README.md",
      "src/index.html",
      "build.js",
    ].map((file) => path.join(targetDir, file));

    const projectName = responses.projectName ?? opts.name;
    const projectDescription = responses.projectDescription ?? opts.description;

    filesToReplace.forEach((filePath) => {
      let content = fs.readFileSync(filePath, "utf8");
      content = content.replace(/{{ projectName }}/g, projectName);
      content = content.replace(
        /{{ projectDescription }}/g,
        projectDescription,
      );
      fs.writeFileSync(filePath, content, "utf8");
    });

    // Initialize npm and install dependencies
    execSync("npm init -y", { cwd: targetDir, stdio: "inherit" });
    execSync(`npm install lean-jsx@${version} lean-jsx-types@${typesVersion}`, {
      cwd: targetDir,
      stdio: "inherit",
    });

    execSync("npm install", { cwd: targetDir, stdio: "inherit" });

    console.log("Project generated successfully.");
  });

program.parse();
