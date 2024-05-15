import { Category } from '../../entities/categories.entity';
import { DeepPartial } from 'typeorm';
import { CategoriesRepository } from './categories.repository';
export declare class CategoriesService {
    private readonly categoriesRepository;
    constructor(categoriesRepository: CategoriesRepository);
    getCategories(): Promise<Category[]>;
    addCategories(): Promise<string>;
    getCategoryById(id: string): Promise<Category>;
    addCaterory(category: DeepPartial<Category>): Promise<Category>;
    deleteCategory(id: string): Promise<string>;
}
