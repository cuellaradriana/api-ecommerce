import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseUUIDPipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { MinSizeFilePipe } from '../../pipes/minSizeFiles.pipe';
import { AuthGuard } from '../auth/guards/auth.guard';
import { UploadApiResponse } from 'cloudinary';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from '../../decorators/role.decorator';
import { Role } from '../auth/role/role.enum';
import { RolesGuard } from '../auth/guards/roles.guard';
import { FileNotEmptyInterceptor } from 'src/interceptors/fileNotEmpty.interceptor';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @ApiTags('products')
  @Post('uploadImage/:id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Subir archivo para actualizar la imagen de algún producto',
  })
  @UseInterceptors(FileInterceptor('image'), FileNotEmptyInterceptor)
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @UsePipes(MinSizeFilePipe)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description:
      'Archivo a subir, formatos permitidos: jpg, jpeg, png, webp, gif, svg',
    required: true,
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadImage(
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 200000,
            message: 'El archivo debe ser menor a 200 Kb',
          }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp|gif|svg)/,
          }),
        ],
      }),
    )
    image: Express.Multer.File,
  ): Promise<UploadApiResponse> {
    return await this.filesService.uploadImage(id, image);
  }
}
