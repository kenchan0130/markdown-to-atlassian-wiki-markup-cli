export interface ProcessArguments {
  toArray(): string[];
  hasPassedArguments(): boolean;
}

class ProcessArgumentsImpl implements ProcessArguments {
  private argv: string[];

  public constructor(argv: string[]) {
    if (argv.length < 2) throw new TypeError("The argv must be 2 or more.");
    this.argv = argv;
  }

  public toArray(): string[] {
    return this.argv;
  }

  public hasPassedArguments(): boolean {
    return this.argv.length > 2;
  }
}

export const processArguments: ProcessArguments = new ProcessArgumentsImpl(
  process.argv
);
