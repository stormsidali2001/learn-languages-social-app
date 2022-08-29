import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedController } from './controllers/feed.controller';
import { FeedPostEntity } from '../core/entities/post.entity';
import { FeedService } from './services/feed.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports:[TypeOrmModule.forFeature([FeedPostEntity]),AuthModule],
  providers: [FeedService],
  controllers:[FeedController]
})
export class FeedModule {}
