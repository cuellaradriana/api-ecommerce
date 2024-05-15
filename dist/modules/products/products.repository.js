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
exports.ProductsRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const products_entity_1 = require("../../entities/products.entity");
const typeorm_2 = require("@nestjs/typeorm");
const categories_entity_1 = require("../../entities/categories.entity");
const data = require("../../utils/seedData.json");
const orderDetail_entity_1 = require("../../entities/orderDetail.entity");
let ProductsRepository = class ProductsRepository {
    constructor(productsRepository, categoriesRepository, orderDetailRepository) {
        this.productsRepository = productsRepository;
        this.categoriesRepository = categoriesRepository;
        this.orderDetailRepository = orderDetailRepository;
    }
    async getProducts(page, limit) {
        page = Math.max(1, page);
        limit = Math.max(1, limit);
        const startIndex = (page - 1) * limit;
        const products = await this.productsRepository.find({
            where: { stock: (0, typeorm_1.MoreThan)(0) },
            relations: { category: true },
            skip: startIndex,
            take: limit,
        });
        return products;
    }
    async getProductById(id) {
        const product = await this.productsRepository.findOne({
            where: { id },
            relations: { category: true },
        });
        if (product) {
            return product;
        }
        throw new common_1.NotFoundException(`Producto con ID ${id}, no encontrado`);
    }
    async addProduct(product) {
        const foundProduct = await this.productsRepository.findOneBy({
            name: product.name,
        });
        if (foundProduct) {
            throw new common_1.BadRequestException(`El producto ${product.name} ya existe en nuestros registros.`);
        }
        const foundCategory = await this.categoriesRepository.findOne({
            where: { id: product.category },
        });
        if (!foundCategory) {
            throw new common_1.BadRequestException('No se pueden añadir un producto sin antes haber registrado la categoría');
        }
        const newProduct = new products_entity_1.Product();
        newProduct.name = product.name;
        newProduct.description = product.description;
        newProduct.price = product.price;
        newProduct.stock = product.stock;
        newProduct.imgUrl = product.imgUrl;
        newProduct.category = foundCategory;
        await this.productsRepository.save(newProduct);
        return `Producto creado exitosamente con ID ${newProduct.id}`;
    }
    async addProducts() {
        const ordersLoaded = await this.orderDetailRepository.find();
        if (ordersLoaded.length > 0) {
            return 'No es posible hacer el reinicio, porque hay productos involucrados en ordenes de compra.';
        }
        const categoriesLoaded = await this.categoriesRepository.find();
        if (categoriesLoaded.length === 0) {
            throw new common_1.BadRequestException('No se pueden agregar productos sin antes haber registrado las categorías');
        }
        for await (const item of data) {
            const category = await this.categoriesRepository.findOne({
                where: { name: item.category },
            });
            const seedProduct = new products_entity_1.Product();
            seedProduct.name = item.name;
            seedProduct.description = item.description;
            seedProduct.price = item.price;
            seedProduct.stock = item.stock;
            seedProduct.category = category;
            seedProduct.imgUrl = item.imgUrl;
            await this.productsRepository
                .createQueryBuilder()
                .insert()
                .into(products_entity_1.Product)
                .values(seedProduct)
                .orUpdate(['description', 'price', 'stock', 'imgUrl'], ['name'])
                .execute();
        }
        return 'Productos cargados exitosamente';
    }
    async updateProduct(id, product) {
        const productToUpdate = await this.productsRepository.findOneBy({ id });
        if (productToUpdate) {
            await this.productsRepository.update(productToUpdate, product);
            return `El producto con ID${productToUpdate.id}, ha sido actualizado exitosamente`;
        }
        throw new common_1.NotFoundException(`Producto con ID ${id}, no encontrado`);
    }
    async deleteProduct(id) {
        const productToDelete = await this.productsRepository.findOneBy({ id });
        if (productToDelete) {
            const ordenDetail = await this.orderDetailRepository.find({
                where: { products: productToDelete },
            });
            if (ordenDetail.length === 0) {
                await this.productsRepository.delete({ id: productToDelete.id });
                return `El producto con ID ${productToDelete.id}, ha sido eliminado exitosamente. `;
            }
            throw new common_1.BadRequestException('El producto no se puede eliminar ya que tiene ordenes asociadas');
        }
        throw new common_1.NotFoundException(`Producto con ID ${id}, no encontrado`);
    }
};
exports.ProductsRepository = ProductsRepository;
exports.ProductsRepository = ProductsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(products_entity_1.Product)),
    __param(1, (0, typeorm_2.InjectRepository)(categories_entity_1.Category)),
    __param(2, (0, typeorm_2.InjectRepository)(orderDetail_entity_1.OrderDetail)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], ProductsRepository);
//# sourceMappingURL=products.repository.js.map