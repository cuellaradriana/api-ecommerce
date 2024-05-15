/// <reference types="multer" />
import { UploadApiResponse } from 'cloudinary';
import { Product } from '../../entities/products.entity';
import { Repository } from 'typeorm';
export declare class FilesService {
    private readonly productsRepository;
    constructor(productsRepository: Repository<Product>);
    uploadImage(id: string, image: Express.Multer.File): Promise<UploadApiResponse>;
}
