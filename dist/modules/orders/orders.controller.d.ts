import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/createOrder.dto';
import { Order } from '../../entities/orders.entity';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    getOrdersByUser(userId: string): Promise<Order[]>;
    getOrderByID(id: string): Promise<Order>;
    addOrder(createOrder: CreateOrderDto): Promise<Order>;
}
