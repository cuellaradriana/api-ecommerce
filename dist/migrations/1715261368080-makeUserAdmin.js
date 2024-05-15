"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MakeUserAdmin1715261368080 = void 0;
class MakeUserAdmin1715261368080 {
    async up(queryRunner) {
        await queryRunner.query(`UPDATE users SET "isAdmin" = true WHERE "id" = ''`);
    }
    async down(queryRunner) {
        await queryRunner.query(`UPDATE users SET "isAdmin" = false WHERE "id" = ''`);
    }
}
exports.MakeUserAdmin1715261368080 = MakeUserAdmin1715261368080;
//# sourceMappingURL=1715261368080-makeUserAdmin.js.map