import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';

import { AppController } from './app.controller';
import { RequestLoggerMiddleware } from './common/middleware/request-logger.middleware';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { RolesGuard } from './common/roles/roles.guard';
import { ThrottlerConfigService } from './common/throttler-config.service';
import { CategoryModule } from './furnitures/category.module';
import { UserModule } from './users/user.module';
import { FurnitureModule } from './furnitures/furniture.module';
import { FavoriteModule } from './users/favorite.module';
import { ShoppingCartModule } from './cart/cart.module';
import { OrderModule } from './orders/order.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    AuthModule,
    CategoryModule,
    FurnitureModule,
    UserModule,
    FavoriteModule,
    ShoppingCartModule,
    OrderModule,
    ConfigModule.forRoot({
      envFilePath: '.env.development',
      cache: true,
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      useClass: ThrottlerConfigService,
    }),
    EventEmitterModule.forRoot(),
    MailModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('/');
  }
}
