import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { Order } from '../entities/orders.entity';
import { User } from '../entities/users.entity';

interface IUser {
  id: string;
  name: string;
  email: string;
  phone: number;
  address: string;
  country?: string;
  city?: string;
  isAdmin?: boolean;
  orders?: Order[];
}

@Injectable()
export class ExcludePasswordInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) => {
        if (Array.isArray(data)) {
          return data.map((item) => this.excludePassword(item));
        } else {
          return this.excludePassword(data);
        }
      }),
    );
  }
  private excludePassword(data: User): IUser {
    if (data && data.password) {
      const { password, ...dataWithoutPassword } = data;
      return dataWithoutPassword;
    }
    return data;
  }
}
