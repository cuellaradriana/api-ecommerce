import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { ProductsModule } from './modules/products/products.module';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmConfig from './config/typeorm';
import { CategoriesModule } from './modules/categories/categories.module';
import { OrdersModule } from './modules/orders/orders.module';
import { FilesModule } from './modules/files/files.module';
import { JwtModule } from '@nestjs/jwt';
import { CategoriesService } from './modules/categories/categories.service';
import { ProductsService } from './modules/products/products.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '1h',
      },
    }),
    AuthModule,
    CategoriesModule,
    OrdersModule,
    ProductsModule,
    UsersModule,
    FilesModule,
  ],
  providers: [CategoriesService, ProductsService],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly productsService: ProductsService,
  ) {}

  async onApplicationBootstrap() {
    await this.categoriesService.addCategories();
    await this.productsService.addProducts();
  }
}
