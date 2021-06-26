import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Image, ImageSchema } from "./schema/image.schema";
import { ImageController } from "./image.controller";
import { ImageService } from "./image.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: Image.name, schema: ImageSchema }])],
    controllers: [ImageController],
    providers: [ImageService],
    exports: [ImageService],
})

export class ImageModule {}