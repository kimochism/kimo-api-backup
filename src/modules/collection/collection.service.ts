import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { QueryOptions } from 'src/shared/query-options';
import { Collection, CollectionModel } from './schema/collection.schema';

@Injectable()
export class CollectionService {
    constructor(
        @InjectModel(Collection.name) private readonly collectionModel: Model<CollectionModel>,
    ) { }

    async getCollections(options: QueryOptions): Promise<{ data: CollectionModel[]; total?: number, offset?: number, limit?: number }> {
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

    async getCollection(id: string): Promise<CollectionModel> {
        return await this.collectionModel.findById(id).populate({ path: 'products', model: 'Product'}).exec();
    }

    async createCollection(collection: CollectionModel): Promise<CollectionModel> {
        const newCollection = await this.collectionModel.create(collection);
        return newCollection;
    }

    async updateCollection(id: string, collection: CollectionModel): Promise<CollectionModel> {
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