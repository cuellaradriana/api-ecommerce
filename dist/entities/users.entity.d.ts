import { Order } from '../entities/orders.entity';
export declare class User {
    id: string;
    name: string;
    email: string;
    password: string;
    phone: number;
    address: string;
    country: string;
    city: string;
    isAdmin: boolean;
    orders: Order[];
}
