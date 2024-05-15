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
exports.UsersRerpository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_entity_1 = require("../../entities/users.entity");
const typeorm_2 = require("typeorm");
const orders_entity_1 = require("../../entities/orders.entity");
let UsersRerpository = class UsersRerpository {
    constructor(usersRepository, ordersRepository) {
        this.usersRepository = usersRepository;
        this.ordersRepository = ordersRepository;
    }
    async getUsers(page, limit) {
        page = Math.max(1, page);
        limit = Math.max(1, limit);
        const startIndex = (page - 1) * limit;
        const users = await this.usersRepository.find({
            skip: startIndex,
            take: limit,
        });
        return users;
    }
    async getUserById(id) {
        const user = await this.usersRepository.findOne({
            where: { id },
            relations: { orders: true },
        });
        if (user) {
            delete user.isAdmin;
            return user;
        }
        throw new common_1.NotFoundException(`Usuario con ID ${id}, no encontrado.`);
    }
    async updateUser(id, user) {
        const userToUpdate = await this.usersRepository.findOneBy({ id });
        if (userToUpdate) {
            await this.usersRepository.update(userToUpdate, user);
            return `El usuario con ID ${userToUpdate.id}, fue actualizado exitosamente.`;
        }
        throw new common_1.NotFoundException(`Usuario con ID ${id}, no encontrado.`);
    }
    async updateUserByAdmin(userId) {
        const userToUpdate = await this.usersRepository.findOneBy({ id: userId });
        const isAdminStatus = {
            isAdmin: true,
        };
        if (userToUpdate) {
            await this.usersRepository.update(userToUpdate, isAdminStatus);
            return `El usuario con ID ${userToUpdate.id}, fue actualizado exitosamente.`;
        }
        throw new common_1.NotFoundException(`Usuario con ID ${userId}, no encontrado.`);
    }
    async deleteUser(id) {
        const userToDelete = await this.usersRepository.findOneBy({ id });
        if (userToDelete) {
            const orders = await this.ordersRepository.find({
                where: { user: { id: userToDelete.id } },
            });
            if (orders.length === 0) {
                await this.usersRepository.delete({ id: userToDelete.id });
                return `El usuario con ID ${userToDelete.id}, fue eliminado exitosamente.`;
            }
            throw new common_1.BadRequestException('No puedes eliminar tu cuenta si tienes ordenes asociadas');
        }
        throw new common_1.NotFoundException(`Usuario con ID ${id}, no encontrado.`);
    }
};
exports.UsersRerpository = UsersRerpository;
exports.UsersRerpository = UsersRerpository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(orders_entity_1.Order)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UsersRerpository);
//# sourceMappingURL=users.repository.js.map