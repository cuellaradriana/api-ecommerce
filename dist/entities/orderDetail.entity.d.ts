import { Order } from './orders.entity';
import { Product } from '../entities/products.entity';
export declare class ColumnNumericTransformer {
    to(data: number): number;
    from(data: string): number;
}
export declare class OrderDetail {
    id: string;
    price: number;
    products: Product[];
    order: Order;
}
