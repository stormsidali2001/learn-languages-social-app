import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { from, Observable } from "rxjs";
import { DeleteResult, UpdateResult } from "typeorm";
import { CreatePostDTO, UpdatePostDTO } from "../models/post.dto";
import { FeedPostEntity } from "../models/post.entity";
import { FeedService } from "../services/feed.service";


@Controller('feed')
export class FeedController{
    constructor(private readonly feedService:FeedService){}
    @Post()
    create(@Body() feedPost:CreatePostDTO):Observable<FeedPostEntity>{
       return from(this.feedService.createPost(feedPost));
    }

    @Get()
    findAll(@Query('offset') offset:number = 0, @Query('limit') limit:number = 10):Observable<FeedPostEntity[]>{
        limit = limit > 20 ? 20 :limit;    
        return this.feedService.findAll(offset,limit);
    }
    @Put(":id")
    updatePost(@Param('id') id:number,@Body() feedPost:UpdatePostDTO):Observable<UpdateResult>{
        return this.feedService.updatePost(id,feedPost);
    }
    @Delete(':id')
    deletePost(@Param('id') id:number):Observable<DeleteResult>{
        return this.feedService.deletePost(id);
    }
}
