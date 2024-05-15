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
exports.DecodeTokenGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
let DecodeTokenGuard = class DecodeTokenGuard {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.split(' ')[1] ?? '';
        if (!token) {
            throw new common_1.ForbiddenException('Token de autorización no proporcionado');
        }
        const decoded = this.jwtService.decode(token);
        if (Object.keys(request.params).length > 0) {
            if (request.params.id !== decoded.id) {
                throw new common_1.ForbiddenException('No puedes ejecutar esta ruta con un ID distinto al del usuario loggeado');
            }
        }
        else {
            if (request.body.userId !== decoded.id) {
                throw new common_1.ForbiddenException('No puedes ejecutar esta ruta con un ID distinto al del usuario loggeado');
            }
        }
        return true;
    }
};
exports.DecodeTokenGuard = DecodeTokenGuard;
exports.DecodeTokenGuard = DecodeTokenGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], DecodeTokenGuard);
//# sourceMappingURL=decodeToken.guard.js.map