"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExcludePasswordInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
let ExcludePasswordInterceptor = class ExcludePasswordInterceptor {
    intercept(context, next) {
        return next.handle().pipe((0, rxjs_1.map)((data) => {
            if (Array.isArray(data)) {
                return data.map((item) => this.excludePassword(item));
            }
            else {
                return this.excludePassword(data);
            }
        }));
    }
    excludePassword(data) {
        if (data && data.password) {
            const { password, ...dataWithoutPassword } = data;
            return dataWithoutPassword;
        }
        return data;
    }
};
exports.ExcludePasswordInterceptor = ExcludePasswordInterceptor;
exports.ExcludePasswordInterceptor = ExcludePasswordInterceptor = __decorate([
    (0, common_1.Injectable)()
], ExcludePasswordInterceptor);
//# sourceMappingURL=excludePassword.interceptor.js.map