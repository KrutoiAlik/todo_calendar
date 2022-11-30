import {Database, RunResult} from "sqlite3";
const sqlite3 = require('sqlite3').verbose();
const db_path = `${__dirname}\\..\\database\\sqlite.db`;

class Dao {

    static db_instance: Database | undefined;

    static getInstance() {

        if (!this.db_instance) {
            this.db_instance = new sqlite3.Database(db_path, (err: Error) => {
                if (err) {
                    console.log({err});
                }

                console.log('Connected');
            });
        }

        return this.db_instance;
    }

    static closeInstance() {
        if (this.db_instance) {
            this.db_instance.close();
        }
        this.db_instance = undefined;
    }

    static async db_all(query: any) {

        const db: Database = Dao.getInstance() as Database;

        return new Promise(function (resolve, reject) {
            db.all(query, function (err: any, rows: any) {
                Dao.closeInstance();
                if (err) {
                    return reject(err);
                }

                resolve(rows);
            });
        });
    }

    static async db_run(query: any) {

        const db: Database = Dao.getInstance() as Database;

        return new Promise(function (resolve, reject) {
            db.run(query, function (this: RunResult, err: any) {
                Dao.closeInstance();

                if (err) {
                    return reject(err);
                }

                resolve(this);
            });
        });
    }

    static async db_get(query: any) {

        const db: Database = Dao.getInstance() as Database;

        return new Promise(function (resolve, reject) {
            db.get(query, function (err: any, row: any) {
                Dao.closeInstance();

                if (err) {
                    console.log("promise rejected")
                    return reject(err);
                }

                resolve(row);
            });
        });
    }

    static async massUpdate(table: string, records: any[]) {

        const db: Database = Dao.getInstance() as Database;

        await this.beginTransaction();

        const runPromises = records.map((record: any) => {

            const values = Object.keys(record)
                .filter(key => !!record[key])
                .map(key => `${key} = '${record[key]}'`);

            return new Promise((resolve, reject) => {
                db.run(
                    `UPDATE ${table} SET ${values.join(', ')} WHERE id = ${record.id}`,
                    function (this: RunResult, err) {

                        if (err) {
                            return reject(err);
                        }

                        resolve(this);
                    });
            });
        });

        await Promise.all(runPromises);

        await this.commitTransaction();
    }

    private static commitTransaction() {

        const db: Database = Dao.getInstance() as Database;

        return new Promise((resolve, reject) => {
            db.run('COMMIT', function (this, err) {
                if (err) {
                    reject(err);
                }

                resolve(0);
            })
        });
    }

    private static beginTransaction() {

        const db: Database = Dao.getInstance() as Database;

        return new Promise((resolve, reject) => {
            db.run('BEGIN', function (err) {
                if (err) {
                    reject(err);
                }

                resolve(0);
            });
        });
    }
}

export {
    Dao
}