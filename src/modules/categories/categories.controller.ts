import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from '../../entities/categories.entity';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../decorators/role.decorator';
import { Role } from '../auth/role/role.enum';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async getCategories(): Promise<Category[]> {
    return await this.categoriesService.getCategories();
  }

  @ApiBearerAuth()
  @Get('seeder')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  async addCategories(): Promise<string> {
    return await this.categoriesService.addCategories();
  }

  @Get(':id')
  async getCategoryById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Category> {
    return await this.categoriesService.getCategoryById(id);
  }

  @ApiBearerAuth()
  @Post()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  async addCategory(@Body() category: CreateCategoryDto): Promise<Category> {
    return await this.categoriesService.addCaterory(category);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  async deleteCategory(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<string> {
    return await this.categoriesService.deleteCategory(id);
  }
}
