import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/updateUser.dto';
import { User } from '../../entities/users.entity';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUsers(page?: string, limit?: string): Promise<User[]>;
    getUserById(id: string): Promise<User>;
    updateUser(id: string, user: UpdateUserDto): Promise<string>;
    updateUserByAdmin(userId: string): Promise<string>;
    deleteUser(id: string): Promise<string>;
}
