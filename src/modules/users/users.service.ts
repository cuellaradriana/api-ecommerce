import { Injectable } from '@nestjs/common';
import { User } from '../../entities/users.entity';
import { UsersRerpository } from './users.repository';
import { DeepPartial } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRerpository) {}

  async getUsers(page: number, limit: number): Promise<User[]> {
    return await this.usersRepository.getUsers(page, limit);
  }

  async getUserById(id: string): Promise<User> {
    return await this.usersRepository.getUserById(id);
  }

  async updateUser(id: string, user: DeepPartial<User>): Promise<string> {
    return await this.usersRepository.updateUser(id, user);
  }

  async updateUserByAdmin(userId: string): Promise<string> {
    return await this.usersRepository.updateUserByAdmin(userId);
  }

  async deleteUser(id: string): Promise<string> {
    return await this.usersRepository.deleteUser(id);
  }
}
