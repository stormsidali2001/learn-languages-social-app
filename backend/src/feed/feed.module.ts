import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedController } from './controllers/feed.controller';
import { FeedPostEntity } from '../core/entities/post.entity';
import { FeedService } from './services/feed.service';
import { AuthModule } from '../auth/auth.module';
import { IsCreatorGuard } from './guards/is-creator.guard';

@Module({
  imports:[TypeOrmModule.forFeature([FeedPostEntity]),AuthModule],
  providers: [FeedService,IsCreatorGuard],
  controllers:[FeedController]
})
export class FeedModule {}
