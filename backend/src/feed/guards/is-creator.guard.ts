import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { from, map, Observable, of, switchMap } from 'rxjs';
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
      switchMap((userDb:UserEntity)=>{
          if(userDb.role === Role.ADMIN){
            return of(true);
          }
          Logger.warn(`not admin  ${JSON.stringify(userDb)}`,'debugggggggggg')
          return this.feedPostService.findByIdAndAuthor(params.id,user.sub).pipe(
            map(
              (post:FeedPostEntity)=>{
                Logger.warn(`post ${JSON.stringify(post)}`,'debugggggggggg')
                if(post) return true
                else return false; 
              }
            )
          )
          
      }),

    )
  }
}
