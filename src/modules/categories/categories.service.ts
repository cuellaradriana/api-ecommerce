import { Injectable } from '@nestjs/common';
import { Category } from '../../entities/categories.entity';
import { DeepPartial } from 'typeorm';
import { CategoriesRepository } from './categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async getCategories(): Promise<Category[]> {
    return await this.categoriesRepository.getCategories();
  }

  async addCategories(): Promise<string> {
    return await this.categoriesRepository.addCategories();
  }

  async getCategoryById(id: string): Promise<Category> {
    return await this.categoriesRepository.getCategoryById(id);
  }

  async addCaterory(category: DeepPartial<Category>): Promise<Category> {
    return await this.categoriesRepository.addCaterory(category);
  }

  async deleteCategory(id: string): Promise<string> {
    return await this.categoriesRepository.deleteCategory(id);
  }
}
