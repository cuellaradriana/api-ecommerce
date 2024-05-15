import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MoreThan, Repository } from 'typeorm';
import { Product } from '../../entities/products.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../../entities/categories.entity';
import * as data from '../../utils/seedData.json';
import { OrderDetail } from '../../entities/orderDetail.entity';
import { IProduct, IProductUpdate } from './interfaces/product.interface';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
    @InjectRepository(OrderDetail)
    private readonly orderDetailRepository: Repository<OrderDetail>,
  ) {}
  async getProducts(page: number, limit: number): Promise<Product[]> {
    page = Math.max(1, page);
    limit = Math.max(1, limit);
    const startIndex = (page - 1) * limit;
    const products = await this.productsRepository.find({
      where: { stock: MoreThan(0) },
      relations: { category: true },
      skip: startIndex,
      take: limit,
    });
    return products;
  }

  async getProductById(id: string): Promise<Product> {
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: { category: true },
    });
    if (product) {
      return product;
    }
    throw new NotFoundException(`Producto con ID ${id}, no encontrado`);
  }

  async addProduct(product: IProduct): Promise<string> {
    const foundProduct = await this.productsRepository.findOneBy({
      name: product.name,
    });
    if (foundProduct) {
      throw new BadRequestException(
        `El producto ${product.name} ya existe en nuestros registros.`,
      );
    }
    const foundCategory = await this.categoriesRepository.findOne({
      where: { id: product.category },
    });

    if (!foundCategory) {
      throw new BadRequestException(
        'No se pueden añadir un producto sin antes haber registrado la categoría',
      );
    }
    const newProduct = new Product();
    newProduct.name = product.name;
    newProduct.description = product.description;
    newProduct.price = product.price;
    newProduct.stock = product.stock;
    newProduct.imgUrl = product.imgUrl;
    newProduct.category = foundCategory;

    await this.productsRepository.save(newProduct);
    return `Producto creado exitosamente con ID ${newProduct.id}`;
  }

  async addProducts(): Promise<string> {
    const ordersLoaded = await this.orderDetailRepository.find();
    if (ordersLoaded.length > 0) {
      return 'No es posible hacer el reinicio, porque hay productos involucrados en ordenes de compra.';
    }
    const categoriesLoaded = await this.categoriesRepository.find();
    if (categoriesLoaded.length === 0) {
      throw new BadRequestException(
        'No se pueden agregar productos sin antes haber registrado las categorías',
      );
    }
    for await (const item of data) {
      const category = await this.categoriesRepository.findOne({
        where: { name: item.category },
      });

      const seedProduct = new Product();
      seedProduct.name = item.name;
      seedProduct.description = item.description;
      seedProduct.price = item.price;
      seedProduct.stock = item.stock;
      seedProduct.category = category;
      seedProduct.imgUrl = item.imgUrl;

      await this.productsRepository
        .createQueryBuilder()
        .insert()
        .into(Product)
        .values(seedProduct)
        .orUpdate(['description', 'price', 'stock', 'imgUrl'], ['name'])
        .execute();
    }
    return 'Productos cargados exitosamente';
  }

  async updateProduct(id: string, product: IProductUpdate): Promise<string> {
    const productToUpdate = await this.productsRepository.findOneBy({ id });
    if (productToUpdate) {
      await this.productsRepository.update(productToUpdate, product);
      return `El producto con ID${productToUpdate.id}, ha sido actualizado exitosamente`;
    }
    throw new NotFoundException(`Producto con ID ${id}, no encontrado`);
  }

  async deleteProduct(id: string): Promise<string> {
    const productToDelete = await this.productsRepository.findOneBy({ id });
    if (productToDelete) {
      const ordenDetail = await this.orderDetailRepository.find({
        where: { products: productToDelete },
      });
      if (ordenDetail.length === 0) {
        await this.productsRepository.delete({ id: productToDelete.id });
        return `El producto con ID ${productToDelete.id}, ha sido eliminado exitosamente. `;
      }
      throw new BadRequestException(
        'El producto no se puede eliminar ya que tiene ordenes asociadas',
      );
    }
    throw new NotFoundException(`Producto con ID ${id}, no encontrado`);
  }
}
