import { Body, Controller, Post } from "@nestjs/common";
import { Observable } from "rxjs";
import { registerUserDTO } from "../../core/dtos/user.dto";
import { UserEntity } from "../../core/entities/user.entity";
import { AuthService } from "../services/auth.service";



@Controller('auth')
export class AuthController{
    constructor(private authService:AuthService){}

    @Post('register')
    register(@Body() user:registerUserDTO):Observable<UserEntity>{
        return this.authService.registerUser(user);
    }
    
}