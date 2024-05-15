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
exports.CreateCategoryDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateCategoryDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String, minLength: 3, maxLength: 50, pattern: "/^[^\\d]+$/" } };
    }
}
exports.CreateCategoryDto = CreateCategoryDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Debe ser un string entre 3 y 50 caracteres',
        example: 'notebooks',
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El campo "name" no puede estar vacío' }),
    (0, class_validator_1.IsString)({ message: 'El campo "name" debe ser un string' }),
    (0, class_validator_1.Length)(3, 50, { message: 'El campo "name" debe entre 3 y 50 caracteres' }),
    (0, class_validator_1.Matches)(/^[^\d]+$/, {
        message: 'El campo "name" de la categoría no puede contener números',
    }),
    __metadata("design:type", String)
], CreateCategoryDto.prototype, "name", void 0);
//# sourceMappingURL=createCategory.dto.js.map