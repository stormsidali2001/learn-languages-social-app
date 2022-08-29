import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { map, Observable, switchMap } from "rxjs";
import { UserEntity } from "src/core/entities/user.entity";
import { UserService } from "../../user/user.service";
import { ROLES_KEY } from "../decorators/hasroles.decorator";


@Injectable()
export class RolesGuard implements CanActivate{
    constructor(
        private reflector:Reflector,
        private userService:UserService
        
        ){}
    canActivate(context: ExecutionContext): boolean | Observable<boolean> | Promise<boolean> {
        const roles:string[] = this.reflector.getAllAndOverride(ROLES_KEY,
            [
                context.getHandler(),
                context.getHandler()
            ]);
        if(!roles) return true;
        const request = context.switchToHttp().getRequest<Request>();
        //@ts-ignore
        const {sub} = request.user;
        return this.userService.findUserBy({where:{id:sub}}).pipe(
            map(
                (user:UserEntity)=>{
                    return  roles.some(u=>u.includes(user.role)) 
                }
            )
        )



    }
    
}