export interface StandardInput {
  isTTY(): boolean;
  readStreamAsync(): Promise<string>;
}

class StandardInputImpl implements StandardInput {
  private stdin: NodeJS.ReadStream;

  public constructor(stdin: NodeJS.ReadStream) {
    this.stdin = stdin;
  }

  public isTTY(): boolean {
    return !!this.stdin.isTTY;
  }

  public async readStreamAsync(): Promise<string> {
    return new Promise((resolve, reject): void => {
      let data = "";

      this.stdin.on("data", (chunk): void => {
        data += chunk;
      });
      this.stdin.on("end", (): void => resolve(data));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.stdin.on("error", (error: any): void => reject(error));
    });
  }
}

export const standardInput: StandardInput = new StandardInputImpl(
  process.stdin
);
