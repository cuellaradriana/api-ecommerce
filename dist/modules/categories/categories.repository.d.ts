import { Category } from '../../entities/categories.entity';
import { DeepPartial, Repository } from 'typeorm';
import { Product } from '../../entities/products.entity';
export declare class CategoriesRepository {
    private readonly categoriesRepository;
    private readonly productsRepository;
    constructor(categoriesRepository: Repository<Category>, productsRepository: Repository<Product>);
    getCategories(): Promise<Category[]>;
    addCategories(): Promise<string>;
    getCategoryById(id: string): Promise<Category>;
    addCaterory(category: DeepPartial<Category>): Promise<Category>;
    deleteCategory(id: string): Promise<string>;
}
