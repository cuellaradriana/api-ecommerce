import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/users.entity';
import { DeepPartial, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Role } from './role/role.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(user: DeepPartial<User>): Promise<User> {
    const userFound = await this.usersRepository.findOneBy({
      email: user.email,
    });
    if (userFound) {
      throw new ConflictException('El email ya se encuentra registrado.');
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = new User();
    newUser.name = user.name;
    newUser.email = user.email;
    newUser.password = hashedPassword;
    newUser.phone = user.phone;
    newUser.address = user.address;
    newUser.city = user.city;
    newUser.country = user.country;

    const createdUser = await this.usersRepository.save(newUser);
    delete createdUser.isAdmin;
    return createdUser;
  }

  async signIn(email: string, password: string): Promise<object> {
    const user = await this.usersRepository.findOneBy({ email });
    if (!user) {
      throw new UnauthorizedException('Credenciales Inválidas');
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword)
      throw new UnauthorizedException('Credenciales Inválidas');

    const role = [];
    if (user.isAdmin) role.push(Role.Admin);
    if (!user.isAdmin) role.push(Role.User);
    const userPayload = {
      id: user.id,
      email: user.email,
      roles: [...role],
    };
    const token = this.jwtService.sign(userPayload);
    return { message: 'Usuario loggeado', token };
  }
}
