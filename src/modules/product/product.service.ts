import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { QueryOptions } from 'src/shared/query-options';
import { Product, ProductModel } from './schema/product.schema';

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name) private readonly productModel: Model<ProductModel>) { }

    async getProducts(options: QueryOptions): Promise<{ data: ProductModel[]; total?: number, offset?: number, limit?: number }> {

        const data = await this.productModel
            .find(options.fields ? { [options.fields]: options.text} : {}, (err, doc) => {
                return doc;
            })
            .sort({ priority:  -1 })
            .skip(Number(options.offset))
            .limit(Number(options.limit))
            .populate({ path: 'images', model: 'Image'})
            .exec();

        return {
            data,
            total: Number(await this.productModel.count()),
            offset: Number(options.offset) || 0,
            limit: Number(options.limit) || 10,
        };
    }

    async getProduct(id: string): Promise<ProductModel> {
        return await this.productModel.findById(id).populate({ path: 'images', model: 'Image'}).exec();
    }

    async createProduct(product: ProductModel): Promise<ProductModel> {
        const newProduct = await this.productModel.create(product);
        return newProduct;
    }

    async updateProduct(id: string, product: ProductModel): Promise<ProductModel> {

        const foundProduct = await this.productModel.findById(id);

        if (!foundProduct) {
            return;
        }

        await this.productModel.updateOne({ _id: Types.ObjectId(id) }, product).exec();

        return await this.getProduct(id);
    }

    async deleteProduct(id: string): Promise<boolean> {
        const foundProduct = await this.productModel.findById(id);

        if (!foundProduct) {
            return false;
        }

        await this.productModel.deleteOne({ _id: id }).exec();
        return true;
    }

    async updatePrices(): Promise<boolean> {

        console.log('OK');
        await this.productModel.updateMany({}, {
            price: 89.90,
            discount_price: 69.90
        }).exec();

        return true;
    }
}