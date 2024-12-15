import { IBalance } from "../trading/types.js";


export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    balance: IBalance;
}

export interface IUserCreateData {
    firstName: string;
    lastName: string;
    email: string;
}