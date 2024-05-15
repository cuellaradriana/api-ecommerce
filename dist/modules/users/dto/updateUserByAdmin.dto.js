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
exports.UpdateUserByAdminDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UpdateUserByAdminDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { isAdmin: { required: false, type: () => Boolean } };
    }
}
exports.UpdateUserByAdminDto = UpdateUserByAdminDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Debe ser un boolean',
        example: true,
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El campo "isAdmin" es obligatorio' }),
    (0, class_validator_1.IsBoolean)({ message: 'El campo "isAdmin" debe ser un valor booleano' }),
    __metadata("design:type", Boolean)
], UpdateUserByAdminDto.prototype, "isAdmin", void 0);
//# sourceMappingURL=updateUserByAdmin.dto.js.map