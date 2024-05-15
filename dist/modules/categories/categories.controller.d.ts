import { CategoriesService } from './categories.service';
import { Category } from '../../entities/categories.entity';
import { CreateCategoryDto } from './dto/createCategory.dto';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    getCategories(): Promise<Category[]>;
    addCategories(): Promise<string>;
    getCategoryById(id: string): Promise<Category>;
    addCategory(category: CreateCategoryDto): Promise<Category>;
    deleteCategory(id: string): Promise<string>;
}
