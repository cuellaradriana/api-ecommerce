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
exports.Category = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const products_entity_1 = require("./products.entity");
const typeorm_1 = require("typeorm");
let Category = class Category {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String }, products: { required: true, type: () => [require("./products.entity").Product] } };
    }
};
exports.Category = Category;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID de la categoría en formato UUID versión 4, autogenerado por la base de datos',
        example: '3d6b6579-9a63-4e72-99b5-b857fb963265',
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Category.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nombre de la categoría, debe ser único en los registros',
        example: 'smartphone',
    }),
    (0, typeorm_1.Column)({
        length: 50,
        unique: true,
    }),
    __metadata("design:type", String)
], Category.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Array de productos relacionados a la categoría',
    }),
    (0, typeorm_1.OneToMany)(() => products_entity_1.Product, (product) => product.category),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], Category.prototype, "products", void 0);
exports.Category = Category = __decorate([
    (0, typeorm_1.Entity)({
        name: 'categories',
    })
], Category);
//# sourceMappingURL=categories.entity.js.map