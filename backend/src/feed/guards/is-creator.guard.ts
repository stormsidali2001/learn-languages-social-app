import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { from, map, Observable } from 'rxjs';
import { Role } from '../../core/dtos/role.enum';
import { FeedPostEntity } from '../../core/entities/post.entity';
import { UserEntity } from '../../core/entities/user.entity';
import { UserService } from '../../user/user.service';
import { FeedService } from '../services/feed.service';

@Injectable()
export class IsCreatorGuard implements CanActivate {
  constructor(
    private userService:UserService,
    private feedPostService:FeedService
    
    ){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const {user,params}:{user:{sub:number},params:{id:number}}= request;
    if(!user || !params) return false;

    return from(this.userService.findUserBy({where:{id:user.sub}})).pipe(
      map((userDb:UserEntity)=>{
          if(userDb.role === Role.ADMIN){
            return true;
          }
          this.feedPostService.findByIdAndAuthor(params.id,user.sub).pipe(
            map(
              (post:FeedPostEntity)=>{
                if(post) return true
                else return false; 
              }
            )
          )
          
      }),

    )
  }
}
