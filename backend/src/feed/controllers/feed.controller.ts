import { Body, Controller, Post } from "@nestjs/common";
import { from, Observable } from "rxjs";
import { CreatePostDTO } from "../models/post.dto";
import { FeedPostEntity } from "../models/post.entity";
import { FeedService } from "../services/feed.service";


@Controller('feed')
export class FeedController{
    constructor(private readonly feedService:FeedService){}
    @Post()
    create(@Body() feedPost:CreatePostDTO):Observable<FeedPostEntity>{
       return from(this.feedService.createPost(feedPost));
    }
}
