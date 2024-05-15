import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/createOrder.dto';
import { OrdersRepository } from './orders.repository';
import { Order } from '../../entities/orders.entity';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async getOrdersByUser(userId: string): Promise<Order[]> {
    return await this.ordersRepository.getOrdersByUser(userId);
  }
  async getOrderById(id: string): Promise<Order> {
    return await this.ordersRepository.getOrderById(id);
  }

  async addOrder(order: CreateOrderDto): Promise<Order> {
    const { userId, products } = order;
    return await this.ordersRepository.addOrder(userId, products);
  }
}
