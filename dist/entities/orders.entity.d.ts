import { User } from '../entities/users.entity';
import { OrderDetail } from './orderDetail.entity';
export declare class Order {
    id: string;
    date: Date;
    user: User;
    orderDetail: OrderDetail;
}
