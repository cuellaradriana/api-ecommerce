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
exports.User = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const orders_entity_1 = require("../entities/orders.entity");
const typeorm_1 = require("typeorm");
let User = class User {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String }, email: { required: true, type: () => String }, password: { required: true, type: () => String }, phone: { required: true, type: () => Number }, address: { required: true, type: () => String }, country: { required: true, type: () => String }, city: { required: true, type: () => String }, isAdmin: { required: true, type: () => Boolean }, orders: { required: true, type: () => [require("./orders.entity").Order] } };
    }
};
exports.User = User;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID del Usuario en formato UUID versión 4, autogenerado por la base de datos',
        example: '3d6b6579-9a63-4e72-99b5-b857fb963012',
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nombre del Usuario',
        example: 'Adriana Cuellar',
    }),
    (0, typeorm_1.Column)({
        length: 50,
    }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Email del Usuario',
        example: 'adriana@mail.com',
    }),
    (0, typeorm_1.Column)({
        length: 50,
        unique: true,
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Password del Usuario encriptada',
        example: 'adriana@mail.com',
    }),
    (0, typeorm_1.Column)({ type: 'char', length: 60 }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Teléfono del Usuario',
        example: 1133334444,
    }),
    (0, typeorm_1.Column)({ type: 'bigint' }),
    __metadata("design:type", Number)
], User.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Dirección del Usuario',
        example: 'Cerrito 123',
    }),
    (0, typeorm_1.Column)('varchar'),
    __metadata("design:type", String)
], User.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'País de residencia del Usuario, no es estrictamente requerido',
        example: 'Argentina | null',
    }),
    (0, typeorm_1.Column)({
        length: 50,
        nullable: true,
    }),
    __metadata("design:type", String)
], User.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Ciudad de residencia del Usuario, no es estrictamente requerida',
        example: 'Capital Federal | null',
    }),
    (0, typeorm_1.Column)({
        length: 50,
        nullable: true,
    }),
    __metadata("design:type", String)
], User.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Rol del Usuario, asociado a si es Administrador o no. Se crea al momento del registro con un valor por defecto de "false"',
        example: false,
    }),
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isAdmin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Array de órdenes relacionadas con el usuario.',
    }),
    (0, typeorm_1.OneToMany)(() => orders_entity_1.Order, (order) => order.user),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], User.prototype, "orders", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)({
        name: 'users',
    })
], User);
//# sourceMappingURL=users.entity.js.map