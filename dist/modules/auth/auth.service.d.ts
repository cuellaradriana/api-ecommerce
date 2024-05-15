import { User } from '../../entities/users.entity';
import { DeepPartial, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly usersRepository;
    private readonly jwtService;
    constructor(usersRepository: Repository<User>, jwtService: JwtService);
    signUp(user: DeepPartial<User>): Promise<User>;
    signIn(email: string, password: string): Promise<object>;
}
