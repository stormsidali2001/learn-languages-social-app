import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
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
    findAll():Observable<FeedPostEntity[]>{
        return from(this.feedService.findAll());
    }
    @Put(":id")
    updatePost(@Param('id') id:number,@Body() feedPost:UpdatePostDTO):Observable<UpdateResult>{
        return from(this.feedService.updatePost(id,feedPost))
    }
    @Delete(':id')
    deletePost(@Param('id') id:number):Observable<DeleteResult>{
        return from(this.feedService.deletePost(id));
    }
}
