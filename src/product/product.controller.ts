import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request, UseGuards } from "@nestjs/common";
import { Product } from "./schema/product.schema";
import { ProductService } from "./product.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Get()
    async getProducts(): Promise<Product[]> {
        return this.productService.getProducts();
    }

    @Get(':id')
    async getProduct(@Param('id') id: string): Promise<Product> {
        return this.productService.getProduct(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createProduct(@Body() product: Product): Promise<Product> {
        return this.productService.createProduct(product);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async updateProduct(@Param('id') id: string, @Body() product: Product): Promise<Product> {
        return this.productService.updateProduct(id, product);
    }
    
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteProduct(@Param('id') id: string): Promise<boolean> {
        return this.productService.deleteProduct(id);
    }
}