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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersRepository = void 0;
const common_1 = require("@nestjs/common");
const orders_entity_1 = require("../../entities/orders.entity");
const orderDetail_entity_1 = require("../../entities/orderDetail.entity");
const typeorm_1 = require("typeorm");
const users_entity_1 = require("../../entities/users.entity");
const products_entity_1 = require("../../entities/products.entity");
const typeorm_2 = require("@nestjs/typeorm");
let OrdersRepository = class OrdersRepository {
    constructor(ordersRepository, usersRepository, dataSource) {
        this.ordersRepository = ordersRepository;
        this.usersRepository = usersRepository;
        this.dataSource = dataSource;
    }
    async getOrdersByUser(userId) {
        const user = await this.usersRepository.findOneBy({ id: userId });
        if (!user) {
            throw new common_1.NotFoundException(`Usuario con ID ${userId}, no encontrado`);
        }
        return this.ordersRepository.find({
            where: { user },
            relations: ['orderDetail', 'orderDetail.products'],
        });
    }
    async getOrderById(id) {
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
        throw new common_1.NotFoundException(`Orden con ID ${id}, no encontrada`);
    }
    async addOrder(userId, products) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const entityManager = queryRunner.manager;
            const user = await entityManager.findOne(users_entity_1.User, {
                where: { id: userId },
            });
            if (!user) {
                throw new common_1.NotFoundException(`Usuario con ID ${userId}, no encontrado`);
            }
            const productsToUpdate = [];
            let totalPrice = 0;
            for (const product of products) {
                const foundProduct = await entityManager.findOne(products_entity_1.Product, {
                    where: { id: product.id },
                });
                if (!foundProduct) {
                    throw new common_1.NotFoundException(`Producto con ID ${product.id}, no encontrado`);
                }
                if (foundProduct.stock === 0) {
                    throw new common_1.NotFoundException('Stock Insuficiente');
                }
                foundProduct.stock--;
                totalPrice += foundProduct.price;
                await entityManager.save(products_entity_1.Product, foundProduct);
                productsToUpdate.push(foundProduct);
            }
            const newOrder = entityManager.create(orders_entity_1.Order, {
                date: new Date(),
                user: user,
            });
            await entityManager.save(orders_entity_1.Order, newOrder);
            const newOrderDetail = entityManager.create(orderDetail_entity_1.OrderDetail, {
                price: totalPrice,
                order: newOrder,
                products: productsToUpdate,
            });
            await entityManager.save(orderDetail_entity_1.OrderDetail, newOrderDetail);
            const totalOrder = await entityManager.findOne(orders_entity_1.Order, {
                where: { id: newOrder.id },
                relations: {
                    orderDetail: true,
                },
            });
            await queryRunner.commitTransaction();
            return totalOrder;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.HttpException(error.message, common_1.HttpStatus.NOT_FOUND);
            }
        }
        finally {
            await queryRunner.release();
        }
    }
};
exports.OrdersRepository = OrdersRepository;
exports.OrdersRepository = OrdersRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(orders_entity_1.Order)),
    __param(1, (0, typeorm_2.InjectRepository)(users_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.DataSource])
], OrdersRepository);
//# sourceMappingURL=orders.repository.js.map