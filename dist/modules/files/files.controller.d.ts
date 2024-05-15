/// <reference types="multer" />
import { FilesService } from './files.service';
import { UploadApiResponse } from 'cloudinary';
export declare class FilesController {
    private readonly filesService;
    constructor(filesService: FilesService);
    uploadImage(id: string, image: Express.Multer.File): Promise<UploadApiResponse>;
}
