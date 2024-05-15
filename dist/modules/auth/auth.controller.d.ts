import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/loginUser.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from '../../entities/users.entity';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(user: CreateUserDto): Promise<User>;
    signIn(credentials: LoginUserDto): Promise<object>;
}
