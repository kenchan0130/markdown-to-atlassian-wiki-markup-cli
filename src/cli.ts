import commander from "commander";
import Encoding from "encoding-japanese";
import path from "path";
import readPkg from "read-pkg";

import { markdownToAtlassianWikiMarkup } from "@kenchan0130/markdown-to-atlassian-wiki-markup";

import { fileStream } from "./fileStream";
import { processArguments } from "./processArguments";
import { standardInput } from "./standardInput";

class CLI {
  public async run(): Promise<string> {
    // Support pipe (stdin)
    if (!standardInput.isTTY()) {
      const text = await standardInput.readStreamAsync();
      return markdownToAtlassianWikiMarkup(text);
    }

    const packages = await readPkg({ cwd: `${path.join(__dirname, "..")}` });
    commander
      .version(packages.version, "-v, --version")
      .description("Convert markdown to atlassian wiki markup")
      .usage("[file path]")
      .parse(processArguments.toArray());

    if (!processArguments.hasPassedArguments()) {
      return commander.helpInformation();
    }

    const filePath = [...commander.args].shift();

    // This library doesn't expect processing to get here, as we've confirmed with ProcessArguments#hasPassedArguments().
    if (!filePath) {
      throw new Error("Could not get file path from your arguments.");
    }

    const buffer = await fileStream
      .readFileAsync(path.resolve(process.cwd(), filePath))
      .catch((e: unknown) => {
        return Promise.reject(
          `Could not read ${filePath}\n${e instanceof Error ? e.message : e}`
        );
      });
    const detectedEncoding = Encoding.detect(buffer);

    if (!detectedEncoding) {
      return "";
    }

    const text = Encoding.convert(buffer, {
      from: detectedEncoding,
      to: "UTF8",
      type: "string",
    });

    const wikiMarkupText = Encoding.convert(
      markdownToAtlassianWikiMarkup(text),
      {
        from: "UTF8",
        to: detectedEncoding,
        type: "string",
      }
    );
    return wikiMarkupText;
  }
}

export const cli = new CLI();
