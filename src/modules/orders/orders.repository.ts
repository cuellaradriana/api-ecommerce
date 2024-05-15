import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Order } from '../../entities/orders.entity';
import { OrderDetail } from '../../entities/orderDetail.entity';
import { DataSource, DeepPartial, Repository } from 'typeorm';
import { User } from '../../entities/users.entity';
import { Product } from '../../entities/products.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly dataSource: DataSource,
  ) {}

  async getOrdersByUser(userId: string): Promise<Order[]> {
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${userId}, no encontrado`);
    }

    return this.ordersRepository.find({
      where: { user },
      relations: ['orderDetail', 'orderDetail.products'],
    });
  }

  async getOrderById(id: string): Promise<Order> {
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: {
        orderDetail: {
          products: true,
        },
      },
    });
    if (order) {
      return order;
    }
    throw new NotFoundException(`Orden con ID ${id}, no encontrada`);
  }

  async addOrder(userId: string, products: DeepPartial<Product[]>) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const entityManager = queryRunner.manager;
      const user: User = await entityManager.findOne(User, {
        where: { id: userId },
      });
      if (!user) {
        throw new NotFoundException(`Usuario con ID ${userId}, no encontrado`);
      }

      const productsToUpdate: Product[] = [];
      let totalPrice: number = 0;
      for (const product of products) {
        const foundProduct = await entityManager.findOne(Product, {
          where: { id: product.id },
        });

        if (!foundProduct) {
          throw new NotFoundException(
            `Producto con ID ${product.id}, no encontrado`,
          );
        }

        if (foundProduct.stock === 0) {
          throw new NotFoundException('Stock Insuficiente');
        }
        foundProduct.stock--;
        totalPrice += foundProduct.price;
        await entityManager.save(Product, foundProduct);
        productsToUpdate.push(foundProduct);
      }

      const newOrder = entityManager.create(Order, {
        date: new Date(),
        user: user,
      });
      await entityManager.save(Order, newOrder);

      const newOrderDetail = entityManager.create(OrderDetail, {
        price: totalPrice,
        order: newOrder,
        products: productsToUpdate,
      });
      await entityManager.save(OrderDetail, newOrderDetail);

      const totalOrder = await entityManager.findOne(Order, {
        where: { id: newOrder.id },
        relations: {
          orderDetail: true,
        },
      });
      await queryRunner.commitTransaction();
      return totalOrder;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      if (error instanceof NotFoundException) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
    } finally {
      await queryRunner.release();
    }
  }
}
