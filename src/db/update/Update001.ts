import { BaseDBUpdate, DBConnection, SQLightConnector } from '@grandlinex/core';

export default class Update001 extends BaseDBUpdate<any> {
  constructor(db: DBConnection<any>) {
    super('0', '1', db);
  }

  async performe(): Promise<boolean> {
    const db = this.getDb() as SQLightConnector;
    await db.execScripts([
      { exec: `DROP TABLE main.keys;`, param: [] },
      {
        exec: `DELETE FROM main.config WHERE true;`,
        param: [],
      },
      {
        exec: `INSERT INTO  main.config (c_key,c_value) VALUES ('dbversion','1');`,
        param: [],
      },
    ]);
    await db.initNewDB();
    return true;
  }
}
