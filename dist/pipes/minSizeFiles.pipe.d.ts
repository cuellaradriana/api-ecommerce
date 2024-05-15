import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
export declare class MinSizeFilePipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): any;
}
