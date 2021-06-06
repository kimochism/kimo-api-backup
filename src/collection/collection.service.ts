import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Collection, CollectionDocument } from "./schema/collection.schema";

@Injectable()
export class CollectionService {
    constructor(
        @InjectModel(Collection.name) private readonly collectionModel: Model<CollectionDocument>,
    ) { }

    async getCollections(): Promise<Collection[]> {
        const collections = this.collectionModel.find().populate({ path: 'products', model: 'Product'}).exec();

        return collections;
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