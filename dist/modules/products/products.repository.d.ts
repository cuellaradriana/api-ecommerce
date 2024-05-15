import { Repository } from 'typeorm';
import { Product } from '../../entities/products.entity';
import { Category } from '../../entities/categories.entity';
import { OrderDetail } from '../../entities/orderDetail.entity';
import { IProduct, IProductUpdate } from './interfaces/product.interface';
export declare class ProductsRepository {
    private readonly productsRepository;
    private readonly categoriesRepository;
    private readonly orderDetailRepository;
    constructor(productsRepository: Repository<Product>, categoriesRepository: Repository<Category>, orderDetailRepository: Repository<OrderDetail>);
    getProducts(page: number, limit: number): Promise<Product[]>;
    getProductById(id: string): Promise<Product>;
    addProduct(product: IProduct): Promise<string>;
    addProducts(): Promise<string>;
    updateProduct(id: string, product: IProductUpdate): Promise<string>;
    deleteProduct(id: string): Promise<string>;
}
