import { Body, Controller, Post } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { RegisterUserDTO, SignInUserDTO } from "../../core/dtos/user.dto";
import { UserEntity } from "../../core/entities/user.entity";
import { AuthService } from "../services/auth.service";



@Controller('auth')
export class AuthController{
    constructor(private authService:AuthService){}

    @Post('register')
    register(@Body() user:RegisterUserDTO):Observable<UserEntity>{
        return this.authService.registerUser(user);
    }
    
    @Post("login")
    login(@Body() user:SignInUserDTO):Observable<any>{
        return this.authService.login(user)
    }
}