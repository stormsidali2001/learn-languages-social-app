import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, map, Observable } from 'rxjs';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreatePostDTO, UpdatePostDTO } from '../../core/dtos/post.dto';
import { FeedPostEntity } from '../../core/entities/post.entity';

@Injectable()
export class FeedService {
    constructor(
       @InjectRepository(FeedPostEntity) private readonly feedPostRepository:Repository<FeedPostEntity>
    ){}
    createPost(feedPost:CreatePostDTO):Observable<FeedPostEntity>{
        return from(this.feedPostRepository.save(feedPost));
    }
    findAll(offset:number = 0 ,limit:number = 10):Observable<FeedPostEntity[]>{
        return from(
            this.feedPostRepository.findAndCount({skip:offset,take:limit})
            ).pipe(
                map(
                    ([posts,count]: [FeedPostEntity[], number])=>{
                        return posts;
                    }
                )
            )
    }
    updatePost(id:number,feedPost:UpdatePostDTO):Observable<UpdateResult>{
        return from(this.feedPostRepository.update(id,{...feedPost}))
    }
    deletePost(id:number):Observable<DeleteResult>{
        return from(this.feedPostRepository.delete(id));
    }

}
