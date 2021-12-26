import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Collection, CollectionSchema } from './schema/collection.schema';
import { CollectionController } from './collection.controller';
import { CollectionService } from './collection.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: Collection.name, schema: CollectionSchema }])],
    controllers: [CollectionController],
    providers: [CollectionService],
    exports: [CollectionService],
})

export class CollectionModule {}