"use strict";
import Generator from "yeoman-generator";
import chalk from "chalk";
import yosay from "yosay";

const { blue } = chalk;

export default class extends Generator {
  async prompting() {
    this.log(yosay(`Welcome to the ${blue("create-lean-jsx-app")} generator!`));

    const prompts = [
      {
        type: "input",
        name: "name",
        message: "Set a name for your project",
        default: "myapp",
        store: true,
        when: !this.options.name,
      },
      {
        type: "input",
        name: "description",
        message: "A description for your project",
        default: "A lean.js-powered web application!",
        store: true,
        when: !this.options.description,
      },
    ];

    const props = await this.prompt(prompts);
    this.props = props;
    this.props.name = this.options.name || this.props.name;
    this.props.description = this.options.description || this.props.description;
    const dest = this.destinationPath(`${this.props.name}`);
    this.destinationRoot(dest);
    this.config.save();
  }

  writing() {
    // const src = this.sourceRoot();
    // const dest = this.destinationPath(`${this.props.name}`);

    //The ignore array is used to ignore files, push file names into this array that you want to ignore.
    const copyOpts = {
      globOptions: {
        ignore: [],
      },
    };

    this.fs.copy(this.templatePath(".*"), this.destinationPath());
    this.fs.copy(this.templatePath("*"), this.destinationPath());
    this.fs.copy(this.templatePath("src"), this.destinationPath("src"));
    this.fs.copy(this.templatePath(".build/*"), this.destinationPath(`.build`));

    const files = ["package.json", "src/index.html", "build.cjs"];

    const opts = {
      name: this.props.name,
      description: this.props.description,
    };

    files.forEach((file) => {
      this.fs.copyTpl(
        this.templatePath(file),
        this.destinationPath(file),
        opts,
        copyOpts
      );
    });

    this.addDependencies({ "lean-jsx": "^0.0.4" });
  }

  install() {}
}
