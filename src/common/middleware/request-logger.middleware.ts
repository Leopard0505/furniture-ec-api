import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.group('Request');
    console.log('methods:', req.method);
    console.log('headers:', req.headers);
    console.log('originalUrl:', req.originalUrl);
    console.log('params:', req.params);
    console.log('body:', req.body);
    console.groupEnd();
    next();
  }
}
