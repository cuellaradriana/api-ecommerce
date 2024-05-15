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
exports.Order = void 0;
const openapi = require("@nestjs/swagger");
const users_entity_1 = require("../entities/users.entity");
const typeorm_1 = require("typeorm");
const orderDetail_entity_1 = require("./orderDetail.entity");
const swagger_1 = require("@nestjs/swagger");
let Order = class Order {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, date: { required: true, type: () => Date }, user: { required: true, type: () => require("./users.entity").User }, orderDetail: { required: true, type: () => require("./orderDetail.entity").OrderDetail } };
    }
};
exports.Order = Order;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID de la Orden en formato UUID versión 4, autogenerado por la base de datos',
        example: '3d6b6579-9a63-4e72-99b5-b857fb963456',
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Order.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Fecha de la realización de la orden, generada al guardar el registro de la misma',
        example: '15/10/2024',
    }),
    (0, typeorm_1.Column)('date'),
    __metadata("design:type", Date)
], Order.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Relación con el Usuario que ha realizado la orden',
    }),
    (0, typeorm_1.ManyToOne)(() => users_entity_1.User, (user) => user.orders),
    __metadata("design:type", users_entity_1.User)
], Order.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Relación con el Detalle de la Orden',
    }),
    (0, typeorm_1.OneToOne)(() => orderDetail_entity_1.OrderDetail, (orderDetail) => orderDetail.order),
    __metadata("design:type", orderDetail_entity_1.OrderDetail)
], Order.prototype, "orderDetail", void 0);
exports.Order = Order = __decorate([
    (0, typeorm_1.Entity)({
        name: 'orders',
    })
], Order);
//# sourceMappingURL=orders.entity.js.map