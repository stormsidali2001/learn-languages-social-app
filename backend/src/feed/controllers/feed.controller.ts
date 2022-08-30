import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { from, Observable } from "rxjs";
import { AccessTokenJwtGuard } from "../../auth/guards/access-token-jwt-guard";
import { DeleteResult, UpdateResult } from "typeorm";
import { CreatePostDTO, UpdatePostDTO } from "../../core/dtos/post.dto";
import { FeedPostEntity } from "../../core/entities/post.entity";
import { FeedService } from "../services/feed.service";
import { Roles } from "../../auth/decorators/hasroles.decorator";
import { Role } from "../../core/dtos/role.enum";
import { RolesGuard } from "../../auth/guards/Roles.guard";
import { IsCreatorGuard } from "../guards/is-creator.guard";


@Controller('feed')
export class FeedController{
    constructor(private readonly feedService:FeedService){}
    @Post()
    create(@Body() feedPost:CreatePostDTO):Observable<FeedPostEntity>{
       return from(this.feedService.createPost(feedPost));
    }

    @Roles(Role.ADMIN)
    @UseGuards(AccessTokenJwtGuard,RolesGuard)
    @Get()
    findAll(@Query('offset') offset:number = 0, @Query('limit') limit:number = 10):Observable<FeedPostEntity[]>{
        limit = limit > 20 ? 20 :limit;    
        return this.feedService.findAll(offset,limit);
    }
    @UseGuards(AccessTokenJwtGuard,IsCreatorGuard)
    @Put(":id")
    updatePost(@Param('id') id:number,@Body() feedPost:UpdatePostDTO):Observable<UpdateResult>{
        return this.feedService.updatePost(id,feedPost);
    }
    @Delete(':id')
    deletePost(@Param('id') id:number):Observable<DeleteResult>{
        return this.feedService.deletePost(id);
    }
}
