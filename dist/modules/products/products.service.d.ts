import { Product } from '../../entities/products.entity';
import { ProductsRepository } from './products.repository';
import { IProduct, IProductUpdate } from './interfaces/product.interface';
export declare class ProductsService {
    private readonly productsRepository;
    constructor(productsRepository: ProductsRepository);
    getProducts(page: number, limit: number): Promise<Product[]>;
    getProductById(id: string): Promise<Product>;
    addProduct(product: IProduct): Promise<string>;
    addProducts(): Promise<string>;
    updateProduct(id: string, product: IProductUpdate): Promise<string>;
    deleteProduct(id: string): Promise<string>;
}
