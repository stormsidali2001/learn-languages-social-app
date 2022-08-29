import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogginInterceptor } from './common/logingInterceptor.interceptor';
import { FeedModule } from './feed/feed.module';
import { AuthModule } from './auth/auth.module';
import { UserEntity } from './core/entities/user.entity';
import { FeedPostEntity } from './core/entities/post.entity';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    TypeOrmModule.forRoot({
    type:'postgres',
    url:process.env.DATABASE_URL,
    entities:[UserEntity,FeedPostEntity],
    // synchronize:true
  }),
    FeedModule,
    AuthModule,
  
  ],
  providers: [
      {
        provide:APP_INTERCEPTOR,
        useClass:LogginInterceptor
      }
  ],
})
export class AppModule {}
