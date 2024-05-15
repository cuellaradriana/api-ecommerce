import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UploadApiResponse, v2 } from 'cloudinary';
import { Product } from '../../entities/products.entity';
import { Repository } from 'typeorm';
import toStream = require('buffer-to-stream');

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}
  async uploadImage(
    id: string,
    image: Express.Multer.File,
  ): Promise<UploadApiResponse> {
    const foundProduct = await this.productsRepository.findOneBy({ id });
    if (!foundProduct) {
      throw new NotFoundException(`Produto con ID ${id}, no encontrado.`);
    }
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        { resource_type: 'auto' },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
            this.productsRepository.update(id, { imgUrl: result.secure_url });
          }
        },
      );
      toStream(image.buffer).pipe(upload);
    });
  }
}
