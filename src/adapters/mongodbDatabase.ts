import { MongoClient, Db, Collection, Filter, OptionalUnlessRequiredId, ObjectId } from "mongodb";
import { CONFIG } from "./../config/config";

export class mongodbDatabase<T extends object> {
 
    private db: MongoClient;
    private database!: Db;

    constructor() {
        this.db = new MongoClient(CONFIG.DATABASE_PATH);
        this.db.connect()
        .then(() => {
          this.database = this.db.db(CONFIG.DATABASE_NAME);
          console.log('Conexión a MongoDB exitosa');
        })
        .catch(err => {
          console.error('Error al conectar a MongoDB', err);
        });
    }

    async connect(): Promise<void> {
      try {
        await this.db.connect();
        this.database = this.db.db(CONFIG.DATABASE_NAME);
        console.log('Conexión a MongoDB exitosa');
      } catch (err) {
          console.error('Error al conectar a MongoDB', err);
          throw err;
      }
    }
    
    disconnect(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    find(table: string, conditions?: Record<string, unknown>): Promise<T[]> {
        const collection = this.getCollection(table);
        return collection.find(conditions as Filter<T>).toArray()
            .then(docs => docs.map(doc => ({ ...doc, _id: undefined }) as unknown as T));
    }

    private getCollection(collectionName: string): Collection<T> {
        return this.database.collection<T>(collectionName);
    }

    async insert(collectionName: string, data: T) {
        const keys = Object.keys(data);
        const values = Object.values(data);
        console.log(`Insertando en MongoDB: ${keys} -> ${values}`);
    
        try {
          const collection = this.getCollection(collectionName);
          await collection.insertOne(data as OptionalUnlessRequiredId<T>);
        } catch (err) {
          console.error('Error al insertar en MongoDB', err);
        }
    }

    async update(table: string, id: number, data: Partial<T>): Promise<void> {
      console.log(`Updating in MongoDB in ${table}, id: ${id}`, data);
  
      try {
        const collection = this.getCollection(table);
        const result = await collection.updateOne(
          { _id: new ObjectId(id.toString()) } as unknown as Filter<T>,
          { $set: data }
        );
  
        if (result.matchedCount === 0) {
          console.log(`No document found with id ${id}`);
        } else {
          console.log(`Updated document with id ${id}`);
        }
      } catch (err) {
        console.error('Error updating in MongoDB', err);
      }
    }

    async delete(table: string, id: number): Promise<void> {
      console.log(`Deleting in MongoDB in ${table}, id: ${id}`);
  
      try {
        const collection = this.getCollection(table);
        const result = await collection.deleteOne(
          { _id: new ObjectId(id.toString()) } as unknown as Filter<T>
        );
  
        if (result.deletedCount === 0) {
          console.log(`No document found with id ${id}`);
        } else {
          console.log(`Deleted document with id ${id}`);
        }
      } catch (err) {
        console.error('Error deleting from MongoDB', err);
      }
    }
  
}