import { User } from '../../entities/users.entity';
import { DeepPartial, Repository } from 'typeorm';
import { Order } from '../../entities/orders.entity';
export declare class UsersRerpository {
    private readonly usersRepository;
    private readonly ordersRepository;
    constructor(usersRepository: Repository<User>, ordersRepository: Repository<Order>);
    getUsers(page: number, limit: number): Promise<User[]>;
    getUserById(id: string): Promise<User>;
    updateUser(id: string, user: DeepPartial<User>): Promise<string>;
    updateUserByAdmin(userId: string): Promise<string>;
    deleteUser(id: string): Promise<string>;
}
