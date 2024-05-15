import { Injectable } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { Product } from '../../entities/products.entity';
import { ProductsRepository } from './products.repository';
import { IProduct, IProductUpdate } from './interfaces/product.interface';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}
  async getProducts(page: number, limit: number): Promise<Product[]> {
    return await this.productsRepository.getProducts(page, limit);
  }

  async getProductById(id: string): Promise<Product> {
    return await this.productsRepository.getProductById(id);
  }

  async addProduct(product: IProduct): Promise<string> {
    return await this.productsRepository.addProduct(product);
  }

  async addProducts(): Promise<string> {
    return await this.productsRepository.addProducts();
  }

  async updateProduct(id: string, product: IProductUpdate): Promise<string> {
    return await this.productsRepository.updateProduct(id, product);
  }

  async deleteProduct(id: string): Promise<string> {
    return await this.productsRepository.deleteProduct(id);
  }
}
