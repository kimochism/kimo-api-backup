import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { CollectionService } from "./collection.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { Collection } from "./schema/Collection.schema";

@Controller('collections')
export class CollectionController {
    constructor(private readonly collectionService: CollectionService) { }

    @Get()
    async getCollections(): Promise<Collection[]> {
        return this.collectionService.getCollections();
    }

    @Get(':id')
    async getCollection(@Param('id') id: string): Promise<Collection> {
        return this.collectionService.getCollection(id);
    }
    
    @UseGuards(JwtAuthGuard)
    @Post()
    async createCollection(@Body() Collection: Collection): Promise<Collection> {
        return this.collectionService.createCollection(Collection);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async updateCollection(@Param('id') id: string, @Body() collection: Collection): Promise<Collection>{
        return this.collectionService.updateCollection(id, collection);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteCollection(@Param('id') id: string): Promise<boolean> {
        return this.collectionService.deleteCollection(id);
    }

}