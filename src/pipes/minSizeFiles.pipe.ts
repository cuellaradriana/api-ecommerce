import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class MinSizeFilePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const minSize = 20000;

    console.log(value);

    if (value.size < minSize) {
      throw new BadRequestException('El tamaño mínimo permitido es 20 Kb');
    }
    return value;
  }
}
