import { Category } from './categories.entity';
import { OrderDetail } from './orderDetail.entity';
export declare class ColumnNumericTransformer {
    to(data: number): number;
    from(data: string): number;
}
export declare class Product {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: Category;
    imgUrl: string;
    orderDetails: OrderDetail[];
}
