"use strict";
import { join } from "path";
import { file } from "yeoman-assert";
import { run } from "yeoman-test";

describe("generator-create-lean-jsx-app:app", () => {
    beforeAll(() => {
        return run(join(__dirname, "../generators/app")).withPrompts({
            someAnswer: true
        });
    });

    it("creates files", () => {
        file(["dummyfile.txt"]);
    });
});
