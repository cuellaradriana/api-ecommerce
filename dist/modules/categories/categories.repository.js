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
exports.CategoriesRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const categories_entity_1 = require("../../entities/categories.entity");
const typeorm_2 = require("typeorm");
const data = require("../../utils/seedData.json");
const products_entity_1 = require("../../entities/products.entity");
let CategoriesRepository = class CategoriesRepository {
    constructor(categoriesRepository, productsRepository) {
        this.categoriesRepository = categoriesRepository;
        this.productsRepository = productsRepository;
    }
    async getCategories() {
        return await this.categoriesRepository.find();
    }
    async addCategories() {
        for await (const item of data) {
            await this.categoriesRepository
                .createQueryBuilder()
                .insert()
                .into(categories_entity_1.Category)
                .values({ name: item.category })
                .orIgnore()
                .execute();
        }
        return 'Categorías añadidas exitosamente.';
    }
    async getCategoryById(id) {
        const category = await this.categoriesRepository.findOne({
            where: { id },
            relations: { products: true },
        });
        if (category) {
            return category;
        }
        throw new common_1.NotFoundException(`Categoría con ID ${id}, no encontrada.`);
    }
    async addCaterory(category) {
        let { name } = category;
        name = name.toLowerCase();
        const foundCategory = await this.categoriesRepository.findOneBy({
            name,
        });
        if (foundCategory) {
            throw new common_1.ConflictException(`La categoría ${name}, ya existe en nuestros registros.`);
        }
        const newCategory = await this.categoriesRepository.create(category);
        await this.categoriesRepository.save(newCategory);
        return newCategory;
    }
    async deleteCategory(id) {
        const foundCategory = await this.categoriesRepository.findOneBy({
            id,
        });
        if (foundCategory) {
            const products = await this.productsRepository.find({
                where: { category: { name: foundCategory.name } },
            });
            if (products.length > 0) {
                throw new common_1.BadRequestException('No puedes eliminar una categoría que tiene productos asociados');
            }
            await this.categoriesRepository.delete({
                id: foundCategory.id,
            });
            return `La categoría con el ID ${foundCategory.id}, ha sido eliminada exitosamente.`;
        }
        throw new common_1.NotFoundException(`Categoría con ID ${id} no encontrada.`);
    }
};
exports.CategoriesRepository = CategoriesRepository;
exports.CategoriesRepository = CategoriesRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(categories_entity_1.Category)),
    __param(1, (0, typeorm_1.InjectRepository)(products_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CategoriesRepository);
//# sourceMappingURL=categories.repository.js.map