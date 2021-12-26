import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { CollectionModel } from './schema/collection.schema';
import { Request } from 'express';

@Controller('collections')
export class CollectionController {
    constructor(private readonly collectionService: CollectionService) { }

    @Get()
    async getCollections(@Req() req: Request): Promise<{ data: CollectionModel[]; total?: number, offset?: number, limit?: number }> {
        return this.collectionService.getCollections(req.query);
    }

    @Get(':id')
    async getCollection(@Param('id') id: string): Promise<CollectionModel> {
        return this.collectionService.getCollection(id);
    }
    
    @UseGuards(JwtAuthGuard)
    @Post()
    async createCollection(@Body() collection: CollectionModel): Promise<CollectionModel> {
        return this.collectionService.createCollection(collection);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async updateCollection(@Param('id') id: string, @Body() collection: CollectionModel): Promise<CollectionModel>{
        return this.collectionService.updateCollection(id, collection);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteCollection(@Param('id') id: string): Promise<boolean> {
        return this.collectionService.deleteCollection(id);
    }

}