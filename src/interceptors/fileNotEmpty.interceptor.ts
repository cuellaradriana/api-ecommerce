import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError } from 'rxjs';

@Injectable()
export class FileNotEmptyInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const file = request.file;

    if (!file || file.size === 0) {
      throw new BadRequestException('El archivo no puede estar vacío');
    }

    return next.handle().pipe(
      catchError((error) => {
        return new Observable<any>((observer) => {
          observer.error(error);
        });
      }),
    );
  }
}
