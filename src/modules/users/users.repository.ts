import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/users.entity';
import { DeepPartial, Repository } from 'typeorm';
import { Order } from '../../entities/orders.entity';

@Injectable()
export class UsersRerpository {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
  ) {}

  async getUsers(page: number, limit: number): Promise<User[]> {
    page = Math.max(1, page);
    limit = Math.max(1, limit);
    const startIndex = (page - 1) * limit;
    const users: User[] = await this.usersRepository.find({
      skip: startIndex,
      take: limit,
    });

    return users;
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: { orders: true },
    });
    if (user) {
      delete user.isAdmin;
      return user;
    }
    throw new NotFoundException(`Usuario con ID ${id}, no encontrado.`);
  }

  async updateUser(id: string, user: DeepPartial<User>): Promise<string> {
    const userToUpdate = await this.usersRepository.findOneBy({ id });
    if (userToUpdate) {
      await this.usersRepository.update(userToUpdate, user);
      return `El usuario con ID ${userToUpdate.id}, fue actualizado exitosamente.`;
    }
    throw new NotFoundException(`Usuario con ID ${id}, no encontrado.`);
  }

  async updateUserByAdmin(userId: string): Promise<string> {
    const userToUpdate = await this.usersRepository.findOneBy({ id: userId });
    const isAdminStatus = {
      isAdmin: true,
    };
    if (userToUpdate) {
      await this.usersRepository.update(userToUpdate, isAdminStatus);
      return `El usuario con ID ${userToUpdate.id}, fue actualizado exitosamente.`;
    }
    throw new NotFoundException(`Usuario con ID ${userId}, no encontrado.`);
  }
  async deleteUser(id: string): Promise<string> {
    const userToDelete = await this.usersRepository.findOneBy({ id });
    if (userToDelete) {
      const orders = await this.ordersRepository.find({
        where: { user: { id: userToDelete.id } },
      });
      if (orders.length === 0) {
        await this.usersRepository.delete({ id: userToDelete.id });
        return `El usuario con ID ${userToDelete.id}, fue eliminado exitosamente.`;
      }
      throw new BadRequestException(
        'No puedes eliminar tu cuenta si tienes ordenes asociadas',
      );
    }
    throw new NotFoundException(`Usuario con ID ${id}, no encontrado.`);
  }
}
