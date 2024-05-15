import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../../entities/categories.entity';
import { DeepPartial, Repository } from 'typeorm';
import * as data from '../../utils/seedData.json';
import { Product } from '../../entities/products.entity';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async getCategories(): Promise<Category[]> {
    return await this.categoriesRepository.find();
  }

  async addCategories(): Promise<string> {
    for await (const item of data) {
      await this.categoriesRepository
        .createQueryBuilder()
        .insert()
        .into(Category)
        .values({ name: item.category })
        .orIgnore()
        .execute();
    }
    return 'Categorías añadidas exitosamente.';
  }

  async getCategoryById(id: string): Promise<Category> {
    const category = await this.categoriesRepository.findOne({
      where: { id },
      relations: { products: true },
    });
    if (category) {
      return category;
    }
    throw new NotFoundException(`Categoría con ID ${id}, no encontrada.`);
  }

  async addCaterory(category: DeepPartial<Category>): Promise<Category> {
    let { name } = category;
    name = name.toLowerCase();

    const foundCategory = await this.categoriesRepository.findOneBy({
      name,
    });
    if (foundCategory) {
      throw new ConflictException(
        `La categoría ${name}, ya existe en nuestros registros.`,
      );
    }
    const newCategory = await this.categoriesRepository.create(category);
    await this.categoriesRepository.save(newCategory);
    return newCategory;
  }

  async deleteCategory(id: string): Promise<string> {
    const foundCategory = await this.categoriesRepository.findOneBy({
      id,
    });
    if (foundCategory) {
      const products = await this.productsRepository.find({
        where: { category: { name: foundCategory.name } },
      });
      if (products.length > 0) {
        throw new BadRequestException(
          'No puedes eliminar una categoría que tiene productos asociados',
        );
      }
      await this.categoriesRepository.delete({
        id: foundCategory.id,
      });
      return `La categoría con el ID ${foundCategory.id}, ha sido eliminada exitosamente.`;
    }
    throw new NotFoundException(`Categoría con ID ${id} no encontrada.`);
  }
}
