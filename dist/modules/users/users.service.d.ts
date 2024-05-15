import { User } from '../../entities/users.entity';
import { UsersRerpository } from './users.repository';
import { DeepPartial } from 'typeorm';
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: UsersRerpository);
    getUsers(page: number, limit: number): Promise<User[]>;
    getUserById(id: string): Promise<User>;
    updateUser(id: string, user: DeepPartial<User>): Promise<string>;
    updateUserByAdmin(userId: string): Promise<string>;
    deleteUser(id: string): Promise<string>;
}
