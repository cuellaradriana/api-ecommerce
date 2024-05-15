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
exports.Product = exports.ColumnNumericTransformer = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const categories_entity_1 = require("./categories.entity");
const orderDetail_entity_1 = require("./orderDetail.entity");
const typeorm_1 = require("typeorm");
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
let Product = class Product {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String }, description: { required: true, type: () => String }, price: { required: true, type: () => Number }, stock: { required: true, type: () => Number }, category: { required: true, type: () => require("./categories.entity").Category }, imgUrl: { required: true, type: () => String }, orderDetails: { required: true, type: () => [require("./orderDetail.entity").OrderDetail] } };
    }
};
exports.Product = Product;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID de la Orden en formato UUID versión 4, autogenerado por la base de datos',
        example: '3d6b6579-9a63-4e72-99b5-b857fb963789',
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Product.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nombre del producto',
        example: 'Iphone 15',
    }),
    (0, typeorm_1.Column)({
        length: 50,
        unique: true,
    }),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Descripción del Producto',
        example: 'The best smartphone in the world',
    }),
    (0, typeorm_1.Column)('varchar'),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Precio del Producto, número flotante con dos decimales',
        example: 199.99,
    }),
    (0, typeorm_1.Column)({
        type: 'numeric',
        precision: 10,
        scale: 2,
        transformer: new ColumnNumericTransformer(),
    }),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Stock del Producto, número entero positivo',
        example: 12,
    }),
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], Product.prototype, "stock", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Categoría del producto, asociada por medio de relación con la entidad "Category"',
    }),
    (0, typeorm_1.ManyToOne)(() => categories_entity_1.Category, (category) => category.products),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", categories_entity_1.Category)
], Product.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'URL de la Imagen de referencia del producto',
        example: 'https://st4.depositphotos.com/14953852/22772/v/450/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg',
    }),
    (0, typeorm_1.Column)({
        type: 'text',
        default: 'https://images-cdn.ubuy.co.in/633a87dfd6b53a07f76e0444-ip12-pro-max-unlocked-smartphone-for.jpg',
    }),
    __metadata("design:type", String)
], Product.prototype, "imgUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Relación con las ordenes generadas con el producto',
    }),
    (0, typeorm_1.ManyToMany)(() => orderDetail_entity_1.OrderDetail, (orderDetail) => orderDetail.products),
    __metadata("design:type", Array)
], Product.prototype, "orderDetails", void 0);
exports.Product = Product = __decorate([
    (0, typeorm_1.Entity)({
        name: 'products',
    })
], Product);
//# sourceMappingURL=products.entity.js.map