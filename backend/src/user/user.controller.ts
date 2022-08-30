import { Controller, Get } from "@nestjs/common";
import { Observable } from "rxjs";
import { UserEntity } from "src/core/entities/user.entity";
import { UserService } from "./user.service";


@Controller('users')
export class UserController{
    constructor(
        private readonly userService:UserService
    ){}
    
    @Get()
    findAll():Observable<UserEntity[]>{
        return this.userService.findAll();
    }
}