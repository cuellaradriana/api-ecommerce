import { Order } from '../../entities/orders.entity';
import { DataSource, DeepPartial, Repository } from 'typeorm';
import { User } from '../../entities/users.entity';
import { Product } from '../../entities/products.entity';
export declare class OrdersRepository {
    private ordersRepository;
    private usersRepository;
    private readonly dataSource;
    constructor(ordersRepository: Repository<Order>, usersRepository: Repository<User>, dataSource: DataSource);
    getOrdersByUser(userId: string): Promise<Order[]>;
    getOrderById(id: string): Promise<Order>;
    addOrder(userId: string, products: DeepPartial<Product[]>): Promise<Order>;
}
