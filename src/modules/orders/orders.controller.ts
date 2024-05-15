import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/createOrder.dto';
import { Order } from '../../entities/orders.entity';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../decorators/role.decorator';
import { Role } from '../auth/role/role.enum';
import { RolesGuard } from '../auth/guards/roles.guard';
import { DecodeTokenGuard } from '../auth/guards/decodeToken.guard';

@ApiTags('orders')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('byUser/:id')
  @UseGuards(DecodeTokenGuard)
  async getOrdersByUser(@Param('id') userId: string): Promise<Order[]> {
    return await this.ordersService.getOrdersByUser(userId);
  }

  @Get(':id')
  async getOrderByID(@Param('id', ParseUUIDPipe) id: string): Promise<Order> {
    return await this.ordersService.getOrderById(id);
  }

  @Post()
  @UseGuards(DecodeTokenGuard)
  async addOrder(@Body() createOrder: CreateOrderDto): Promise<Order> {
    return await this.ordersService.addOrder(createOrder);
  }
}
