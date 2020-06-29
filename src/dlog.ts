import { promises } from "fs";

class Log {
  private _file: string;
  constructor(file = "./dlogger.txt") {
    this._file = file;
  }

  set file(file: string) {
    this._file = file;
  }

  async log(txt: string): Promise<void> {
    const timeStamp = Date();
    const data = `
        ${timeStamp.toString()}
          --START--
        ${txt}
          --END--
        `;

    await promises.appendFile(this._file, data, { flag: "a+" });
    console.info(data);
  }

  async read(): Promise<string> {
    const data = await promises.readFile(this._file);
    return data.toString();
  }

  async reset(): Promise<void> {
    await promises.unlink(this._file).catch((error) => {
      console.log(error.message);
    });
  }
}

export { Log };
