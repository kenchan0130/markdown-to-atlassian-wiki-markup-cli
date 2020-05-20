#!/usr/bin/env node

import { cli, CLIResponse } from "./cli";

(async (): Promise<void> => {
  const cliResponse = await (async (): Promise<CLIResponse> => {
    try {
      return await cli.run();
    } catch (error) {
      return new Promise((resolve): void => resolve({ stderr: error.message }));
    }
  })();

  if (cliResponse.stdout) {
    process.stdout.write(cliResponse.stdout);
  } else if (cliResponse.stderr) {
    console.error(cliResponse.stderr);
    process.on("exit", (): void => process.exit(1));
  } else {
    throw new Error(`CLI response is unexpected value. ${{ cliResponse }}`);
  }
})().catch(console.error);
