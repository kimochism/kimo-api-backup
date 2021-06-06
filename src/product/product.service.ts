import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Product, ProductDocument } from "./schema/product.schema";

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name) private readonly productModel: Model<ProductDocument>) { }

    async getProducts(): Promise<Product[]> {
        return await this.productModel.find();
    }

    async getProduct(id: string): Promise<ProductDocument> {
        return await this.productModel.findById(id);
    }

    async createProduct(product: Product): Promise<Product> {
        const newProduct = await this.productModel.create(product);
        return newProduct;
    }

    async updateProduct(id: string, product: Product): Promise<Product> {

        const foundProduct = await this.productModel.findById(id);

        if (!foundProduct) {
            return;
        }

        await this.productModel.updateOne({ _id: Types.ObjectId(id) }, product).exec();

        return await this.getProduct(id);
    }

    async deleteProduct(id: string): Promise<boolean> {
        const foundProduct = this.productModel.findById(id);

        if (!foundProduct) {
            return false;
        }

        await this.productModel.deleteOne({ _id: id }).exec();
        return true;
    }
}