import { inject, injectable } from "inversify";
import { ContainerIdentifiers } from "../core/Container/ContainerIdentifiers.js";
import { IDatabase } from "../core/types.js";
import { IUser, IUserCreateData } from "./types.js";
import { IBalance } from "../trading/types.js";
import { ObjectId } from "mongodb";
import { FromMongo, mapFromMongo } from "../utils/DatabaseUtils.js";

@injectable()
export class UserRepository {

    private collection: string = "users";

    public constructor(
        @inject(ContainerIdentifiers.Database) private readonly database: IDatabase,
    ) { }

    public async createUser(user: IUserCreateData, initialBalance: IBalance): Promise<string> {
        const result = await this.database.execute(this.collection, coll => coll.insertOne({
            ...user,
            balance: { ...initialBalance },
        }));
        return result.insertedId.toString();
    }

    public async findById(id: string): Promise<IUser | null> {
        const result: FromMongo<IUser> | null  = await this.database.execute<FromMongo<IUser>>(this.collection, coll => coll.findOne({ _id: new ObjectId(id) }));
        return mapFromMongo(result);
    }

    public async setBalance(userId: string, balance: IBalance): Promise<void> {
        await this.database.execute(this.collection, coll => coll.updateOne({ _id: new ObjectId(userId)}, { $set: { balance: balance}}))
    }

}
