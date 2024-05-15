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
exports.CreateOrderDto = exports.ProductOrder = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
class ProductOrder {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String } };
    }
}
exports.ProductOrder = ProductOrder;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Debe ser un ID en formato UUID versión 4',
        example: '550e8400-e29b-41d4-a716-446655440000',
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El ID del producto es requerido' }),
    (0, class_validator_1.IsUUID)(4, { message: 'El ID del producto no es un formato UUID' }),
    __metadata("design:type", String)
], ProductOrder.prototype, "id", void 0);
class CreateOrderDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { userId: { required: true, type: () => String }, products: { required: true, type: () => [require("./createOrder.dto").ProductOrder] } };
    }
}
exports.CreateOrderDto = CreateOrderDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Debe ser un ID en formato UUID versión 4',
        example: '120u8400-s29e-41r4-i716-446655440000',
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El ID del usuario es requerido' }),
    (0, class_validator_1.IsUUID)(4, { message: 'El ID del usuario no es un formato UUID' }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Debe ser un array de objetos, con ID's de productos",
        example: [{ id: '550e8400-e29b-41d4-a716-446655440000' }],
    }),
    (0, class_validator_1.IsArray)({ message: 'Los productos deben ir almacenados en un array' }),
    (0, class_validator_1.ArrayMinSize)(1, { message: 'el array de productos no puede estar vacío' }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ProductOrder),
    __metadata("design:type", Array)
], CreateOrderDto.prototype, "products", void 0);
//# sourceMappingURL=createOrder.dto.js.map