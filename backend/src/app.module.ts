import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeedModule } from './feed/feed.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    TypeOrmModule.forRoot({
    database:'postgres',
    url:process.env.DATABASE_URL,
    autoLoadEntities:true,
    synchronize:true
  }),
    FeedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
