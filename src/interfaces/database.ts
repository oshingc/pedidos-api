export interface Database<T> {
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    find(table: string, conditions?: Record<string, unknown>): Promise<T[]>;
    insert(table: string, data: T): Promise<void>;
    update(table: string, id: number, data: Partial<T>): Promise<void>;
    delete(table: string, id: number): Promise<void>;
}