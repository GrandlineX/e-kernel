import { SQLightConnector } from '@grandlinex/core';
import { IBaseKernelModule, KeyType } from '../lib';

export default class KernelDB extends SQLightConnector {
  constructor(module: IBaseKernelModule<any, any, any>) {
    super(module, '1');
  }

  async initNewDB(): Promise<any> {
    await this.execScripts([
      {
        exec: 'CREATE TABLE main.keys(id INTEGER PRIMARY KEY , iv BLOB, auth BLOB);',
        param: [],
      },
    ]);
  }

  setKey(iv: Buffer, auth: Buffer): number {
    const query = this.db?.prepare(
      `REPLACE INTO main.keys (iv ,auth) VALUES (?,?);`
    );
    if (query === undefined) {
      return -1;
    }
    const row = `${query.run([iv, auth]).lastInsertRowid}`;
    return Number.parseInt(row, 10);
  }

  getKey(id: number): KeyType {
    const query = this.db?.prepare(`SELECT * FROM main.keys WHERE id=${id}`);
    return query?.get();
  }

  deleteKey(id: number): void {
    const query = this.db?.prepare(`DELETE FROM main.keys WHERE id=${id}`);
    query?.run();
  }
}
