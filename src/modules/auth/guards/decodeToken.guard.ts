import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class DecodeTokenGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = request.headers.authorization?.split(' ')[1] ?? '';

    if (!token) {
      throw new ForbiddenException('Token de autorización no proporcionado');
    }
    const decoded = this.jwtService.decode(token);
    if (Object.keys(request.params).length > 0) {
      if (request.params.id !== decoded.id) {
        throw new ForbiddenException(
          'No puedes ejecutar esta ruta con un ID distinto al del usuario loggeado',
        );
      }
    } else {
      if (request.body.userId !== decoded.id) {
        throw new ForbiddenException(
          'No puedes ejecutar esta ruta con un ID distinto al del usuario loggeado',
        );
      }
    }
    return true;
  }
}
