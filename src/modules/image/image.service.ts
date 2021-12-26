import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Image, ImageModel } from './schema/image.schema';
import firebase from 'firebase';
import 'firebase/storage';
import { ProductService } from '../product/product.service';

@Injectable()
export class ImageService {
    constructor(
        @InjectModel(Image.name) private readonly imageModel: Model<ImageModel>,
        private readonly productService: ProductService
    ) { }

    async getImages(): Promise<ImageModel[]> {
        return await this.imageModel.find().exec();
    }

    async getImage(id: string): Promise<ImageModel> {
        return await this.imageModel.findById(id).exec();
    }

    async createImage(file: Express.Multer.File, image: ImageModel): Promise<any> {

        const newImage = await this.imageModel.create(image);

        const referenceUrl = `${newImage.product_id}/images/${newImage.id}.png`;
        const reference = firebase.storage().ref(referenceUrl);

        await reference.put(file.buffer);
        
        newImage.url = await firebase.storage().ref(referenceUrl).getDownloadURL();

        newImage.save();

        const foundProduct = await this.productService.getProduct(newImage.product_id);

        foundProduct.images = [newImage.id];

        await this.productService.updateProduct(image.product_id, foundProduct);
        return newImage;
    }

    async updateImage(id: string, image: ImageModel): Promise<ImageModel> {
        const foundImage = await this.imageModel.findById(id);

        if (!foundImage) {
            return;
        }

        await this.imageModel.updateOne({_id: Types.ObjectId(id)}, image);

        return await this.getImage(id);
    }

    async deleteImage(id: string): Promise<boolean> {
        const foundImage = this.imageModel.findById(id);

        if (!foundImage) {
            return false;
        }

        await foundImage.deleteOne({ _id: id });
        return true;
    }
}