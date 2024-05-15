import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { Product } from '../../entities/products.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryConfig } from '../../config/cloudinary';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [FilesController],
  providers: [FilesService, CloudinaryConfig],
})
export class FilesModule {}
