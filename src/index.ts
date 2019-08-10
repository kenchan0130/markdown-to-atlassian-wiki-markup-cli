#!/usr/bin/env node

import { cli, CLIResponse } from "./cli";

(async (): Promise<void> => {
  const result = await (async (): Promise<CLIResponse> => {
    try {
      return await cli.run();
    } catch (error) {
      return new Promise((resolve): void => resolve({ stderr: error.message }));
    }
  })();

  if (result.stdout) {
    process.stdout.write(result.stdout);
  } else if (result.stderr) {
    console.error(result.stderr);
    process.on("exit", (): void => process.exit(1));
  } else {
    throw new Error("CLI result is unexpected values.");
  }
})().catch(console.error);
