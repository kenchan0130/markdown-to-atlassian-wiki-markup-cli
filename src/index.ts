#!/usr/bin/env node

import { cli } from "./cli";

(async (): Promise<void> => {
  try {
    const cliResponse = await cli.run();
    process.stdout.write(cliResponse);
  } catch (e: unknown) {
    console.error(e instanceof Error ? e.message : e);
    process.on("exit", (): void => process.exit(1));
  }
})().catch(console.error);
