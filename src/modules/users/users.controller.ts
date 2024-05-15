import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/updateUser.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { User } from '../../entities/users.entity';
import { Roles } from '../../decorators/role.decorator';
import { Role } from '../auth/role/role.enum';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ExcludePasswordInterceptor } from '../../interceptors/excludePassword.interceptor';
import { DecodeTokenGuard } from '../auth/guards/decodeToken.guard';

@ApiBearerAuth()
@ApiTags('users')
@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseInterceptors(ExcludePasswordInterceptor)
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @ApiQuery({
    name: 'page',
    required: false,
    description:
      'Página de usuarios a la que se quiere acceder. Por default es 1',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description:
      'Cantidad de usuarios que se desean por página. Por default es 5',
  })
  async getUsers(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '5',
  ): Promise<User[]> {
    return await this.usersService.getUsers(Number(page), Number(limit));
  }

  @Get(':id')
  @UseInterceptors(ExcludePasswordInterceptor)
  @UseGuards(DecodeTokenGuard)
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  async getUserById(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return await this.usersService.getUserById(id);
  }

  @Put(':id')
  @UseGuards(DecodeTokenGuard)
  async updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() user: UpdateUserDto,
  ): Promise<string> {
    return await this.usersService.updateUser(id, user);
  }

  @Put('byAdmin/:id')
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  async updateUserByAdmin(
    @Param('id', ParseUUIDPipe) userId: string,
  ): Promise<string> {
    return await this.usersService.updateUserByAdmin(userId);
  }

  @Delete(':id')
  @UseGuards(DecodeTokenGuard)
  async deleteUser(@Param('id', ParseUUIDPipe) id: string): Promise<string> {
    return await this.usersService.deleteUser(id);
  }
}
