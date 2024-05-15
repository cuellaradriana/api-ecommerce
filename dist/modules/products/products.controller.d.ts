import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/createProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { Product } from '../../entities/products.entity';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    getProducts(page?: string, limit?: string): Promise<Product[]>;
    addProducts(): Promise<string>;
    getProductsById(id: string): Promise<Product>;
    addProduct(product: CreateProductDto): Promise<string>;
    updateProduct(id: string, product: UpdateProductDto): Promise<string>;
    deleteProduct(id: string): Promise<string>;
}
