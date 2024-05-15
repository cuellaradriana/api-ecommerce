import { OnApplicationBootstrap } from '@nestjs/common';
import { CategoriesService } from './modules/categories/categories.service';
import { ProductsService } from './modules/products/products.service';
export declare class AppModule implements OnApplicationBootstrap {
    private readonly categoriesService;
    private readonly productsService;
    constructor(categoriesService: CategoriesService, productsService: ProductsService);
    onApplicationBootstrap(): Promise<void>;
}
