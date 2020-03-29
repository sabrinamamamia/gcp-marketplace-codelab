import { readFile, writeFile } from "fs";

const DATABASE_PATH = process.env.PROCUREMENT_CODELAB_DATABASE;

/** JSON-based implementation of a simple file-based database. */
export class JsonDatabase {
  database: {[index:string]: any} = {};

  constructor() {
    readFile(DATABASE_PATH!, (error, data) => {
      this.database = JSON.parse(data.toString());
    });
  }

  /** Reads a record from the database. */
  read(key: string): any {
    if (key in this.database) {
      return this.database[key];
    }
  }

  /** Writes a record to the database. */
  write(key: string, value: any) {
    this.database[key] = value;
    this.commit();
  }

  /** Deletes a record from the database. */
  delete(key: string) {
    delete this.database[key];
  }

  /** Commits the in-memory data to disk. */
  commit() {
    writeFile(DATABASE_PATH!, JSON.stringify(this.database), (error) => {
      if (error) {
        console.log(error);
        return;
      }
    });
  }

  /** Returns all the values in the database. */
  getAll() {
    const items: {[index:string]: any}[] = [];
    for(var key in this.database) {
      items.push(this.database[key]);
    }
    return items;
  }
}
