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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_entity_1 = require("../../entities/users.entity");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const role_enum_1 = require("./role/role.enum");
let AuthService = class AuthService {
    constructor(usersRepository, jwtService) {
        this.usersRepository = usersRepository;
        this.jwtService = jwtService;
    }
    async signUp(user) {
        const userFound = await this.usersRepository.findOneBy({
            email: user.email,
        });
        if (userFound) {
            throw new common_1.ConflictException('El email ya se encuentra registrado.');
        }
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const newUser = new users_entity_1.User();
        newUser.name = user.name;
        newUser.email = user.email;
        newUser.password = hashedPassword;
        newUser.phone = user.phone;
        newUser.address = user.address;
        newUser.city = user.city;
        newUser.country = user.country;
        const createdUser = await this.usersRepository.save(newUser);
        delete createdUser.isAdmin;
        return createdUser;
    }
    async signIn(email, password) {
        const user = await this.usersRepository.findOneBy({ email });
        if (!user) {
            throw new common_1.UnauthorizedException('Credenciales Inválidas');
        }
        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword)
            throw new common_1.UnauthorizedException('Credenciales Inválidas');
        const role = [];
        if (user.isAdmin)
            role.push(role_enum_1.Role.Admin);
        if (!user.isAdmin)
            role.push(role_enum_1.Role.User);
        const userPayload = {
            id: user.id,
            email: user.email,
            roles: [...role],
        };
        const token = this.jwtService.sign(userPayload);
        return { message: 'Usuario loggeado', token };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map