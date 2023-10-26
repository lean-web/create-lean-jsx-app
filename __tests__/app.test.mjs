import { join } from "path";
import helpers, { result } from "yeoman-test";
import { describe, beforeAll, test } from "@jest/globals";

describe("generator-create-lean-jsx-app:app", () => {
  beforeAll(async () => {
    await helpers.run(join(__dirname, "../generators/app")).withOptions({
      name: "myapp2",
      description: "some description",
    });
  });
  test("creates files", () => {
    result.assertFile(["myapp2/tsconfig.json"]);
    result.assertFile(["myapp2/package.json"]);
    result.assertFileContent("myapp2/package.json", /"name": "myapp2"/);
    result.assertFileContent("myapp2/package.json", /"lean-jsx":/);
  });
});
