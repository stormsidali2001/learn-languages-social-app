import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogginInterceptor } from './common/logingInterceptor.interceptor';
import { FeedModule } from './feed/feed.module';
import { AuthModule } from './auth/auth.module';
import { HttpExceptionFilter } from './common/ExceptionFilter.filter';
import { UserModule } from './user/user.module';
@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    TypeOrmModule.forRoot({
    type:'postgres',
    url:process.env.DATABASE_URL,
    autoLoadEntities:true,
    synchronize:true
  }),
    FeedModule,
    AuthModule,
    UserModule
  
  ],
  providers: [
      {
        provide:APP_INTERCEPTOR,
        useClass:LogginInterceptor
      },
      {
        provide:APP_FILTER,
        useClass:HttpExceptionFilter
      }
  ],
})
export class AppModule {}
