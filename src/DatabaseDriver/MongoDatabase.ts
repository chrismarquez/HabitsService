import * as Mongo from "mongodb"

export default class MongoDatabase {
    
    private static database: Mongo.Db;
    private static databaseName: string;

    private static get uri(): string {
        const shellString = "mongodb://chrismarquez:Csma0012@cluster0-shard-00-00-crrrc.mongodb.net:27017,cluster0-shard-00-01-crrrc.mongodb.net:27017,cluster0-shard-00-02-crrrc.mongodb.net:27017/<database>?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin"
        return shellString.replace("<database>", MongoDatabase.databaseName);
    }

    public static async connect(database: string): Promise<void> {
        MongoDatabase.databaseName = database;
        if (MongoDatabase.database == null || MongoDatabase.database == undefined) {
            try {
                MongoDatabase.database = await Mongo.connect(MongoDatabase.uri);
                console.log("connected");
            } catch (e) {
                console.log(e);
            }
        }
    }

    public static async create(document: any, collection: string): Promise<boolean> {
        let operation = MongoDatabase.database
        .collection(collection)
        .insert(document);
        return (await operation).insertedCount == 1;
    }

    public static async read(query: any, collection: string): Promise<any[]> {
        return await MongoDatabase.database
        .collection(collection)
        .find(query)
        .toArray();
    }

    public static async update(query: any, newValues: any, collection: string): Promise<boolean> {
        let operation = MongoDatabase.database
        .collection(collection)
        .updateOne(query, {$set: newValues})
        return (await operation).modifiedCount == 1;
    }

    public static async delete(query: any, collection: string): Promise<number> {
        let operation = MongoDatabase.database
        .collection(collection)
        .deleteMany(query);
        return (await operation).deletedCount as number;
    }

    public static async exists(query: any, collection: string): Promise<boolean> {
        let count = MongoDatabase.database
        .collection(collection)
        .count(query);
        return await count > 0;
    }    

}