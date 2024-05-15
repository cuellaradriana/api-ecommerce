import { CreateOrderDto } from './dto/createOrder.dto';
import { OrdersRepository } from './orders.repository';
import { Order } from '../../entities/orders.entity';
export declare class OrdersService {
    private readonly ordersRepository;
    constructor(ordersRepository: OrdersRepository);
    getOrdersByUser(userId: string): Promise<Order[]>;
    getOrderById(id: string): Promise<Order>;
    addOrder(order: CreateOrderDto): Promise<Order>;
}
