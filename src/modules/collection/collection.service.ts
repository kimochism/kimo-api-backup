import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { QueryOptions } from "src/shared/query-options";
import { Collection, CollectionDocument } from "./schema/collection.schema";

@Injectable()
export class CollectionService {
    constructor(
        @InjectModel(Collection.name) private readonly collectionModel: Model<CollectionDocument>,
    ) { }

    async getCollections(options: QueryOptions): Promise<{ data: Collection[]; total?: number, offset?: number, limit?: number }> {
        const data = await this.collectionModel
            .find(options.fields ? { [options.fields]: options.text} : {}, (err, doc) => {
                return doc;
            })
            .skip(Number(options.offset))
            .limit(Number(options.limit))
            .populate({ path: 'products', model: 'Product'})
            .exec();

        return {
            data,
            total: data.length,
            offset: Number(options.offset) || 0,
            limit: Number(options.limit) || 10,
        };
    }

    async getCollection(id: string): Promise<Collection> {
        return await this.collectionModel.findById(id).populate({ path: 'products', model: 'Product'}).exec();
    }

    async createCollection(collection: Collection): Promise<Collection> {
        const newCollection = await this.collectionModel.create(collection);
        return newCollection;
    }

    async updateCollection(id: string, collection: Collection): Promise<Collection> {
        const foundCollection = await this.collectionModel.findById(id);

        if (!foundCollection) {
            return;
        }

        await this.collectionModel.updateOne({_id: Types.ObjectId(id)}, collection);

        return await this.getCollection(id);
    }

    async deleteCollection(id: string): Promise<boolean> {
        const foundCollection = this.collectionModel.findById(id);

        if (!foundCollection) {
            return false;
        }

        await foundCollection.deleteOne({ _id: id });
        return true;
    }
}