import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../../entities/categories.entity';
import { Product } from '../../entities/products.entity';
import { ProductsRepository } from './products.repository';
import { OrderDetail } from '../../entities/orderDetail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, OrderDetail, Product])],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository],
  exports: [ProductsService, ProductsRepository],
})
export class ProductsModule {}
