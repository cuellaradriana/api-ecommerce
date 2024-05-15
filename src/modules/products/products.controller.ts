import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/createProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Product } from '../../entities/products.entity';
import { Roles } from '../../decorators/role.decorator';
import { Role } from '../auth/role/role.enum';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiQuery({
    name: 'page',
    required: false,
    description:
      'Página de productos a la que se quiere acceder. Por default es 1',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description:
      'Cantidad de productos que se desean por página. Por default es 5',
  })
  async getProducts(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '5',
  ): Promise<Product[]> {
    return await this.productsService.getProducts(Number(page), Number(limit));
  }

  @ApiBearerAuth()
  @Get('seeder')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  async addProducts(): Promise<string> {
    return await this.productsService.addProducts();
  }

  @Get(':id')
  async getProductsById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Product> {
    return await this.productsService.getProductById(id);
  }

  @ApiBearerAuth()
  @Post()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  async addProduct(@Body() product: CreateProductDto): Promise<string> {
    return await this.productsService.addProduct(product);
  }

  @ApiBearerAuth()
  @Put(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  async updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() product: UpdateProductDto,
  ): Promise<string> {
    return await this.productsService.updateProduct(id, product);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  async deleteProduct(@Param('id', ParseUUIDPipe) id: string): Promise<string> {
    return await this.productsService.deleteProduct(id);
  }
}
