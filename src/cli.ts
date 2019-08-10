import { markdownToAtlassianWikiMarkup } from "@kenchan0130/markdown-to-atlassian-wiki-markup";

import path from "path";
import readPkg from "read-pkg";
import commander from "commander";
import Encoding from "encoding-japanese";
import { processArguments } from "./processArguments";
import { standardInput } from "./standardInput";
import { fileStream } from "./fileStream";

export interface CLIResponse {
  stdout?: string;
  stderr?: string;
}

class CLI {
  public async run(): Promise<CLIResponse> {
    // Support pipe
    if (!standardInput.isTTY()) {
      const text = await standardInput.readStreamAsync();
      return { stdout: markdownToAtlassianWikiMarkup(text) };
    }

    const packages = await readPkg();
    commander
      .version(packages.version, "-v, --version")
      .description("Convert markdown to atlassian wiki markup")
      .usage("[file path]")
      .parse(processArguments.toArray());

    if (!processArguments.hasPassedArguments()) {
      return {
        stdout: commander.helpInformation()
      };
    }

    const filePath = commander.args.shift() as string;

    const buffer = await fileStream.readFileAsync(
      path.resolve(process.cwd(), filePath)
    );
    const detectedEncoding = Encoding.detect(buffer);
    const text = Encoding.convert(buffer, {
      from: detectedEncoding,
      to: "UTF8",
      type: "string"
    }) as string;

    const wikiMarkupText = Encoding.convert(
      markdownToAtlassianWikiMarkup(text),
      {
        from: "UTF8",
        to: detectedEncoding,
        type: "string"
      }
    ) as string;
    return { stdout: wikiMarkupText };
  }
}

export const cli = new CLI();
