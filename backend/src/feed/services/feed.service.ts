import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { CreatePostDTO } from '../models/post.dto';
import { FeedPostEntity } from '../models/post.entity';

@Injectable()
export class FeedService {
    constructor(
       @InjectRepository(FeedPostEntity) private readonly feedPostRepository:Repository<FeedPostEntity>
    ){}
    createPost(feedPost:CreatePostDTO):Observable<FeedPostEntity>{
        return from(this.feedPostRepository.save(feedPost));
    }

}
