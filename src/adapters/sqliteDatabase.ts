import { Database } from "./../interfaces/database";
import sqlite3 from "sqlite3";
import { CONFIG } from "./../config/config";

export class sqlliteDatabase<T extends object> implements Database<T> {

    private db!: sqlite3.Database | null;

    constructor() {
        this.db = new sqlite3.Database(CONFIG.DATABASE_PATH);
    }

    connect(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.db = new sqlite3.Database(CONFIG.DATABASE_PATH, (err) => {
                if (err) {
                    reject(err);
                } else {
                    console.log('Conexión a SQLite exitosa');
                    resolve();
                }
            });
        });
    }
    
    disconnect(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                resolve();
                return;
            }
            this.db.close((err) => {
                if (err) {
                    reject(err);
                } else {
                    this.db = null;
                    resolve();
                }
            });
        });
    }
    
    private checkConnection() {
        if (!this.db) {
            throw new Error("Database connection not initialized");
        }
    }

    find(table: string, conditions?: Partial<T>): Promise<T[]> {
        this.checkConnection();
        try {
            if (!conditions || !('id' in conditions)) {
                return new Promise((resolve, reject) => {
                    this.db!.all(table, (err, rows) => {
                        if (err) reject(err);
                        else resolve(rows as T[]);
                    });
                });
            }
            return new Promise((resolve, reject) => {
                this.db!.get(table, [conditions.id], (err, row) => {
                    if (err) reject(err);
                    else resolve(row ? [row] as T[] : []);
                });
            });
        } catch(e) {
            console.log(e);
            throw new Error("Error finding records");
        }
    }

    async insert(table: string, data: T): Promise<void> {
        this.checkConnection();
        const keys = Object.keys(data);
        const values = Object.values(data);
        const placeholders = keys.map(() => "?").join(",");

        const query = `INSERT INTO ${table} (${keys.join(",")}) VALUES (${placeholders})`;

        return new Promise<void>((resolve, reject) => {
            this.db!.run(query, values, function (err) {
                if (err) reject(err);
                else resolve();
            });
        });
    }

    async update(table: string, id: number, data: Partial<T>): Promise<void> {
        const idColumnMap = {
            't_product': 'product_id',
            't_order': 'order_id',
            't_client': 'client_id',
            't_order_product': 'order_product_id'
        };

        const nameColumnMap = {
            't_product': 'product_name',
            't_order': 'order_name',
            't_client': 'client_name'
        };
        
        const idColumn = idColumnMap[table as keyof typeof idColumnMap] || 'id';
        const nameColumn = nameColumnMap[table as keyof typeof nameColumnMap] || 'name';
        const keys = Object.keys(data);
        const values = Object.values(data);
        for(let i = 0; i < keys.length; i++) {
            if (typeof values.at(i) === 'function') {
                keys.splice(i, 1);
                values.splice(i, 1);
            }
            if (keys[i] == "id") {
                keys[i] = idColumn;
            }
            if (keys[i] == "name") {
                keys[i] = nameColumn;
            }
        }
        const query = `UPDATE ${table} SET ${keys.map(key => `${key} = ?`).join(', ')} WHERE ${idColumn} = ?`;

        return new Promise<void>((resolve, reject) => {
            this.db!.run(query, [...values, id], function (err) {
                if (err) reject(err);
                else resolve();
            });
        });
    }

    delete(table: string, id: number): Promise<void> {
        this.checkConnection();
        const idColumnMap = {
            't_product': 'product_id',
            't_order': 'order_id',
            't_client': 'client_id',
            't_order_product': 'order_product_id'
        };
        
        const idColumn = idColumnMap[table as keyof typeof idColumnMap] || 'id';
        const query = `DELETE FROM ${table} WHERE ${idColumn} = ?`;
        return new Promise<void>((resolve, reject) => {
            this.db!.run(query, [id], function (err) {
                if (err) reject(err);
                else resolve();
            });
        });  
    }
    
}