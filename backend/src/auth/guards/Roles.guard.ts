import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { Observable } from "rxjs";
import { ROLES_KEY } from "../decorators/hasroles.decorator";


@Injectable()
export class RolesGuard implements CanActivate{
    constructor(
        private reflector:Reflector,
        
        ){}
    canActivate(context: ExecutionContext): boolean | Observable<boolean> | Promise<boolean> {
        const roles = this.reflector.getAllAndOverride(ROLES_KEY,
            [
                context.getHandler(),
                context.getHandler()
            ]);
        if(!roles) return true;
        const request = context.switchToHttp().getRequest<Request>();
        //@ts-ignore
        const {email,sub} = request.user;


    }
    
}