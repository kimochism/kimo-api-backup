import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { ProductModel } from "./schema/product.schema";
import { ProductService } from "./product.service";
import { JwtAuthGuard } from "src/modules/auth/guards/jwt-auth.guard";
import { Request } from "express";

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Get()
    async getProducts(@Req() req: Request): Promise<{ data: ProductModel[]; total?: number, offset?: number, limit?: number }> {
        return this.productService.getProducts(req.query);
    }

    @Get(':id')
    async getProduct(@Param('id') id: string): Promise<ProductModel> {
        return this.productService.getProduct(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createProduct(@Body() product: ProductModel): Promise<ProductModel> {
        return this.productService.createProduct(product);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async updateProduct(@Param('id') id: string, @Body() product: ProductModel): Promise<ProductModel> {
        return this.productService.updateProduct(id, product);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteProduct(@Param('id') id: string): Promise<boolean> {
        return this.productService.deleteProduct(id);
    }
}