import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreatePostDTO, UpdatePostDTO } from '../models/post.dto';
import { FeedPostEntity } from '../models/post.entity';

@Injectable()
export class FeedService {
    constructor(
       @InjectRepository(FeedPostEntity) private readonly feedPostRepository:Repository<FeedPostEntity>
    ){}
    createPost(feedPost:CreatePostDTO):Observable<FeedPostEntity>{
        return from(this.feedPostRepository.save(feedPost));
    }
    findAll():Observable<FeedPostEntity[]>{
        return from(this.feedPostRepository.find());
    }
    updatePost(id:number,feedPost:UpdatePostDTO):Observable<UpdateResult>{
        return from(this.feedPostRepository.update(id,{...feedPost}))
    }
    deletePost(id:number):Observable<DeleteResult>{
        return from(this.feedPostRepository.delete(id));
    }

}
