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
exports.UpdateProductDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UpdateProductDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { description: { required: true, type: () => String, minLength: 8, maxLength: 150 }, price: { required: true, type: () => Number, minimum: 1 }, stock: { required: true, type: () => Number, minimum: 1, minimum: 1 }, imgUrl: { required: true, type: () => String } };
    }
}
exports.UpdateProductDto = UpdateProductDto;
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, class_validator_1.IsEmpty)({ message: 'El campo "id" no debe ser ingresado' }),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, class_validator_1.IsEmpty)({ message: 'El campo "name" no debe ser ingresado' }),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Debe ser un string entre 8 y 150 caracteres',
        example: '2022 MacBook Air Laptop with M2 chip: 13.6-inch Liquid Retina Display, 8GB RAM, 256GB SSD Storage, Backlit Keyboard, 1080p FaceTime HD Camera.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'El campo "description" debe ser un string' }),
    (0, class_validator_1.Length)(8, 150, {
        message: 'El campo "description" debe tener entre 8 y 150 caracteres',
    }),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Debe ser un número positivo con dos dígitos decimales',
        example: 1099.99,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }, {
        message: 'El campo "price" debe ser un número con, máximo, dos decimales',
    }),
    (0, class_validator_1.IsPositive)({ message: 'El campo "price" debe ser un número positivo' }),
    __metadata("design:type", Number)
], UpdateProductDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Debe ser un número entero, positivo mayor a 0',
        example: 20,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ message: 'El campo "stock" debe ser un número entero' }),
    (0, class_validator_1.IsPositive)({ message: 'El campo "stock" debe ser un número positivo' }),
    (0, class_validator_1.Min)(1, { message: 'No puedes agregar 0 unidades' }),
    __metadata("design:type", Number)
], UpdateProductDto.prototype, "stock", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, class_validator_1.IsEmpty)({ message: 'El campo "category" no debe ser ingresado' }),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Debe ser un string con un formato URL, que contenga la imagen referente del producto',
        example: 'https://www.macstation.com.ar/img/productos/2960-1.jpg://www.minube.com/images/products/image001',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)({}, { message: 'El campo "imgUrl" debe tener un formato válido' }),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "imgUrl", void 0);
//# sourceMappingURL=updateProduct.dto.js.map