import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ImageService } from './image.service';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { ImageModel } from './schema/image.schema';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('images')
export class ImageController {
    constructor(private readonly imageService: ImageService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getImages(): Promise<ImageModel[]> {
        return this.imageService.getImages();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getImage(@Param('id') id: string): Promise<ImageModel> {
        return this.imageService.getImage(id);
    }
    
    @UseGuards(JwtAuthGuard)
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async createImage(@UploadedFile() file: Express.Multer.File, @Body() image: ImageModel): Promise<ImageModel> {
        return this.imageService.createImage(file, image);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async updateImage(@Param('id') id: string, @Body() Image: ImageModel): Promise<ImageModel>{
        return this.imageService.updateImage(id, Image);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteImage(@Param('id') id: string): Promise<boolean> {
        return this.imageService.deleteImage(id);
    }

}