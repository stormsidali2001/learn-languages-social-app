import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LogginInterceptor } from './common/logingInterceptor.interceptor';
import { FeedModule } from './feed/feed.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    TypeOrmModule.forRoot({
    type:'postgres',
    url:process.env.DATABASE_URL,
    autoLoadEntities:true,
    synchronize:true
  }),
    FeedModule],
  controllers: [AppController],
  providers: [AppService,
      {
        provide:APP_INTERCEPTOR,
        useClass:LogginInterceptor
      }
  ],
})
export class AppModule {}
