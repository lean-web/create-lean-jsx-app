"use strict";
import Generator from "yeoman-generator";
import chalk from "chalk";
import yosay from "yosay";
import { join } from "path";
// import install from "yeoman-generator/lib/actions/install";

const { blue } = chalk;

export default class extends Generator {
    async prompting() {
        // Have Yeoman greet the user.
        this.log(
            yosay(`Welcome to the ${blue("create-lean-jsx-app")} generator!`)
        );

        const prompts = [
            {
                type: "input",
                name: "name",
                message: "Set a name for your project",
                default: "myapp"
            },
            {
                type: "input",
                name: "description",
                message: "A description for your project",
                default: "A lean.js-powered web application!"
            }
        ];

        const props = await this.prompt(prompts);
        this.props = props;
    }

    writing() {
        const src = this.sourceRoot();
        const dest = this.destinationPath(`${this.props.name}`);

        //The ignore array is used to ignore files, push file names into this array that you want to ignore.
        const copyOpts = {
            globOptions: {
                ignore: []
            }
        };

        this.fs.copy(src, dest, copyOpts);
        this.fs.copy(
            this.templatePath(".build/*"),
            this.destinationPath(`${this.props.name}/.build`)
        );
        this.fs.copy(
            this.templatePath(".*"),
            this.destinationPath(`${this.props.name}`)
        );

        const files = ["package.json", "src/index.html"];

        const opts = {
            name: this.props.name,
            description: this.props.description
        };

        files.forEach(file => {
            this.fs.copyTpl(
                this.templatePath(file),
                this.destinationPath(`${this.props.name}/${file}`),
                opts,
                copyOpts
            );
        });
    }

    install() {}
}
