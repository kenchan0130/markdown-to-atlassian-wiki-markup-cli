import { standardInput } from "./standardInput";
import { cli } from "./cli";
import { fileStream } from "./fileStream";
import { processArguments } from "./processArguments";

describe("async #run", (): void => {
  beforeEach((): void => {
    jest.restoreAllMocks();
  });

  describe("gotten text with pipe (from standard input)", (): void => {
    const inputText = `# This is UTF-8 markdown

* This is list 1
* This is list 2

## This is heading 2

The __node__ is good language.

`;
    beforeEach((): void => {
      jest
        .spyOn(standardInput, "isTTY")
        .mockImplementation((): boolean => false);

      jest.spyOn(standardInput, "readStreamAsync").mockImplementation(
        (): Promise<string> => {
          return new Promise((resolve, _reject): void => resolve(inputText));
        }
      );
    });

    it("should output markdown is converted to atlassian wiki markup", async (): Promise<
      void
    > => {
      const cliResult = await cli.run();
      const expected = `h1. This is UTF-8 markdown


* This is list 1
* This is list 2

h2. This is heading 2

The *node* is good language.

`;
      expect(cliResult.stdout).toBe(expected);
    });
  });

  describe("specified file", (): void => {
    const inputText = `# This is UTF-8 markdown

* This is list 1
* This is list 2

## This is heading 2

The __node__ is good language.

`;
    beforeEach((): void => {
      jest
        .spyOn(standardInput, "isTTY")
        .mockImplementation((): boolean => true);

      processArguments;
      jest
        .spyOn(processArguments, "toArray")
        .mockImplementation((): string[] => [
          "node",
          "/path/to/dummy",
          "dummuy.txt"
        ]);
      jest
        .spyOn(processArguments, "hasPassedArguments")
        .mockImplementation((): boolean => true);

      jest.spyOn(fileStream, "readFileAsync").mockImplementation(
        (_path, _options): Promise<Buffer> => {
          return new Promise((resolve, _reject): void =>
            resolve(Buffer.from(inputText))
          );
        }
      );
    });

    it("should output markdown is converted to atlassian wiki markup", async (): Promise<
      void
    > => {
      const cliResult = await cli.run();
      const expected = `h1. This is UTF-8 markdown


* This is list 1
* This is list 2

h2. This is heading 2

The *node* is good language.

`;
      expect(cliResult.stdout).toBe(expected);
    });
  });
});
