"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./modules/auth/auth.module");
const products_module_1 = require("./modules/products/products.module");
const users_module_1 = require("./modules/users/users.module");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const typeorm_2 = require("./config/typeorm");
const categories_module_1 = require("./modules/categories/categories.module");
const orders_module_1 = require("./modules/orders/orders.module");
const files_module_1 = require("./modules/files/files.module");
const jwt_1 = require("@nestjs/jwt");
const categories_service_1 = require("./modules/categories/categories.service");
const products_service_1 = require("./modules/products/products.service");
let AppModule = class AppModule {
    constructor(categoriesService, productsService) {
        this.categoriesService = categoriesService;
        this.productsService = productsService;
    }
    async onApplicationBootstrap() {
        await this.categoriesService.addCategories();
        await this.productsService.addProducts();
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [typeorm_2.default],
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (configService) => configService.get('typeorm'),
            }),
            jwt_1.JwtModule.register({
                global: true,
                secret: process.env.JWT_SECRET,
                signOptions: {
                    expiresIn: '1h',
                },
            }),
            auth_module_1.AuthModule,
            categories_module_1.CategoriesModule,
            orders_module_1.OrdersModule,
            products_module_1.ProductsModule,
            users_module_1.UsersModule,
            files_module_1.FilesModule,
        ],
        providers: [categories_service_1.CategoriesService, products_service_1.ProductsService],
    }),
    __metadata("design:paramtypes", [categories_service_1.CategoriesService,
        products_service_1.ProductsService])
], AppModule);
//# sourceMappingURL=app.module.js.map