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
        const {authorId,body} = feedPost;
        return from(this.feedPostRepository.save({
            body,
            author:{id:authorId}
        }));
    }
    findAll(offset:number = 0 ,limit:number = 10):Observable<FeedPostEntity[]>{
        return from(
            this.feedPostRepository.findAndCount({skip:offset,take:limit,relations:['author']})
            ).pipe(
                map(
                    ([posts,count]: [FeedPostEntity[], number])=>{
                        //  posts.forEach(p=>p.author && delete p.author.password)
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

    findByIdAndAuthor(postId:number,authorId:number):Observable<FeedPostEntity>{
        return from(
            this.feedPostRepository.createQueryBuilder('post')
            .where('post.id = :postId and post.authorId = :authorId',{authorId,postId})
            .getOne()
        )
    }

}
