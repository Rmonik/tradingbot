import { ObjectId } from "mongodb";
import { deepCopy } from "./DeepCopy.js";
import { isDefined } from "./TypeUtils.js";

export function mapFromMongo(obj:null): null
export function mapFromMongo<T extends { _id: ObjectId }>(obj: T): Omit<T, "_id"> & { id: string }
export function mapFromMongo<T extends { _id: ObjectId }>(obj: T | null): (Omit<T, "_id"> & { id: string }) | null
export function mapFromMongo<T>(obj: T): T
export function mapFromMongo<T>(object: (T & { _id ?: ObjectId}) | null): (T & { id?: string }) | null {
    if(!isDefined(object)) return null;
    const copy = deepCopy(object);
    const id: string | undefined = isDefined(copy._id) ? copy._id.toString() : undefined;
    delete copy._id;
    return {
        ...copy,
        id: id,
    }
}


export type FromMongo<T> = T extends { id: string } ? Omit<T, "id"> & { _id: ObjectId } : T