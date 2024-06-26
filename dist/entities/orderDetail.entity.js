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
exports.OrderDetail = exports.ColumnNumericTransformer = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const orders_entity_1 = require("./orders.entity");
const products_entity_1 = require("../entities/products.entity");
const swagger_1 = require("@nestjs/swagger");
class ColumnNumericTransformer {
    to(data) {
        return data;
    }
    from(data) {
        return parseFloat(data);
    }
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.ColumnNumericTransformer = ColumnNumericTransformer;
let OrderDetail = class OrderDetail {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, price: { required: true, type: () => Number }, products: { required: true, type: () => [require("./products.entity").Product] }, order: { required: true, type: () => require("./orders.entity").Order } };
    }
};
exports.OrderDetail = OrderDetail;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID del Detalle de la Orden en formato UUID versión 4, autogenerado por la base de datos',
        example: '3d6b6579-9a63-4e72-99b5-b857fb963123',
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], OrderDetail.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Precio Total de la Orden Realizada, número flotante con dos decimales',
        example: 1099.99,
    }),
    (0, typeorm_1.Column)({
        type: 'numeric',
        precision: 10,
        scale: 2,
        transformer: new ColumnNumericTransformer(),
    }),
    __metadata("design:type", Number)
], OrderDetail.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Relación entre los productos y los detalle de la orden ',
    }),
    (0, typeorm_1.ManyToMany)(() => products_entity_1.Product, (product) => product.orderDetails),
    (0, typeorm_1.JoinTable)({
        name: 'orderdetail_products',
        joinColumn: {
            name: 'product_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'orderdetail_id',
            referencedColumnName: 'id',
        },
    }),
    __metadata("design:type", Array)
], OrderDetail.prototype, "products", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Relación del detalle de la orden con la Orden de Compra',
    }),
    (0, typeorm_1.OneToOne)(() => orders_entity_1.Order, (order) => order.orderDetail),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", orders_entity_1.Order)
], OrderDetail.prototype, "order", void 0);
exports.OrderDetail = OrderDetail = __decorate([
    (0, typeorm_1.Entity)({
        name: 'order_details',
    })
], OrderDetail);
//# sourceMappingURL=orderDetail.entity.js.map