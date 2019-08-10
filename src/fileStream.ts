import { promisify } from "util";
import { readFile } from "fs";
import { URL } from "url";

export interface FileStream {
  readFileAsync(
    path: string | number | Buffer | URL,
    options?: { encoding?: null; flag?: string } | null
  ): Promise<Buffer>;
}

class FileStreamImpl implements FileStream {
  public async readFileAsync(
    path: string | number | Buffer | URL,
    options?: { encoding?: null; flag?: string } | null
  ): Promise<Buffer> {
    return promisify(readFile)(path, options);
  }
}

export const fileStream: FileStream = new FileStreamImpl();
