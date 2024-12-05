import { inject, injectable } from "inversify";
import { ContainerIdentifiers } from "../core/Container/ContainerIdentifiers.js";
import { IDatabase } from "../core/types.js";
import { IUser, IUserCreateData } from "./types.js";
import { IBalance } from "../trading/types.js";

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
        return result.insertedId;
    }


}