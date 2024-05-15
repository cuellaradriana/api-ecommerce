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
exports.CreateUserDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const matchPassword_decorator_1 = require("../../../decorators/matchPassword.decorator");
class CreateUserDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String, minLength: 3, maxLength: 80, pattern: "/^[a-zA-Z\\s]+$/" }, email: { required: true, type: () => String }, password: { required: true, type: () => String, minLength: 8, maxLength: 15, pattern: "/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).+$/" }, confirmPassword: { required: true, type: () => String }, phone: { required: true, type: () => Number, minimum: 1 }, address: { required: true, type: () => String, minLength: 3, maxLength: 80 }, country: { required: false, type: () => String, minLength: 4, maxLength: 20, pattern: "/^[a-zA-Z\\s]+$/" }, city: { required: false, type: () => String, minLength: 4, maxLength: 20 } };
    }
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Debe ser un string entre 3 y 80 caracteres',
        example: 'User Test',
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El campo "name" no puede estar vacío' }),
    (0, class_validator_1.IsString)({ message: 'El campo "name" debe ser un string' }),
    (0, class_validator_1.Length)(3, 80, {
        message: 'El campo "name" debe tener entre 3 y 80 caracteres',
    }),
    (0, class_validator_1.Matches)(/^[a-zA-Z\s]+$/, {
        message: 'El campo "name" no puede contener números',
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Debe ser un string en formato de email',
        example: 'UserTest@mail.com',
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El campo "email" no puede estar vacío' }),
    (0, class_validator_1.IsEmail)({}, { message: 'El campo "email" debe contener un formato válido.' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Debe ser un string con una longitud entre 8 y 15 caracteres y debe contener 1 mayúscula, 1 minúscula, 1 dígito numérico y 1 carácter especial',
        example: 'Abcd0123!*',
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El campo "password" no puede estar vacío' }),
    (0, class_validator_1.IsString)({ message: 'El campo "password" debe ser un string' }),
    (0, class_validator_1.Length)(8, 15, {
        message: 'El campo "password" debe tener entre 8 y 15 caracteres',
    }),
    (0, class_validator_1.Matches)(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).+$/, {
        message: `El password debe contener al menos: 
      1 letra mayúscula.
      1 letra minúscula
      1 dígito numérico
      1 carácter especial entre: "!@#$%^&*"`,
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Debe coincidir con la primer contraseña',
        example: 'Abcd0123!*',
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El campo "confirmPassword" no puede estar vacío' }),
    (0, class_validator_1.Validate)(matchPassword_decorator_1.MatchPassword, ['password']),
    __metadata("design:type", String)
], CreateUserDto.prototype, "confirmPassword", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Debe ser un número entero, positivo y con una longitud mínima de 7 dígitos',
        example: 1144445555,
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El campo "phone" no puede estar vacío' }),
    (0, class_validator_1.IsInt)({ message: 'El campo "phone" debe ser un número entero' }),
    (0, class_validator_1.IsPositive)({ message: 'El campo "phone" no puede ser un número negativo' }),
    __metadata("design:type", Number)
], CreateUserDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Debe ser un string entre 3 y 80 caracteres',
        example: 'Calle Falsa 123',
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El campo "address" no puede estar vacío' }),
    (0, class_validator_1.IsString)({ message: 'El campo "address" debe ser un string' }),
    (0, class_validator_1.Length)(3, 80, {
        message: 'El campo "address" debe tener entre 3 y 80 caracteres',
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Debe ser un string entre 4 y 20 caracteres',
        example: 'Cuba',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'El campo "country" debe ser un string' }),
    (0, class_validator_1.Length)(4, 20, {
        message: 'El campo "country" debe tener entre 4 y 20 caracteres',
    }),
    (0, class_validator_1.Matches)(/^[a-zA-Z\s]+$/, {
        message: 'El campo "country" no puede contener números',
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Debe ser un string entre 4 y 20 caracteres',
        example: 'Ciudad Bonita',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'El campo "city" debe ser un string' }),
    (0, class_validator_1.Length)(4, 20, {
        message: 'El campo "city" no puede contener números',
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, class_validator_1.IsEmpty)({ message: 'El campo "isAdmin" no debe ser ingresado' }),
    __metadata("design:type", Boolean)
], CreateUserDto.prototype, "isAdmin", void 0);
//# sourceMappingURL=createUser.dto.js.map