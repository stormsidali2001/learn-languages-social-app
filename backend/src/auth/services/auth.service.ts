import {ForbiddenException, HttpCode, HttpException, Injectable} from '@nestjs/common'
import { from, map, Observable, pipe, switchMap } from 'rxjs';
import * as bcrypt from 'bcrypt';
import { RegisterUserDTO, SignInUserDTO } from '../../core/dtos/user.dto';
import { Repository } from 'typeorm';
import { UserEntity } from '../../core/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../../user/user.service';

@Injectable()
export class AuthService{
    constructor(
        private readonly jwtService:JwtService,
        private readonly configService:ConfigService,
        private readonly userService:UserService,
        ){}
    hashPassword(password:string):Observable<string>{
        return from(bcrypt.hash(password,12));
    }
    comparePassword(password,passwordDb):Observable<boolean>{
        return from(bcrypt.compare(password,passwordDb));
    }
    registerUser(user:RegisterUserDTO):Observable<UserEntity>{
        const {email,password,firstName,lastName,role} = user;
        return this.hashPassword(password).pipe(
            switchMap((passwordHash:string)=>{
                const userDb = <UserEntity>{email,firstName,lastName,password:passwordHash,role} 
                return from(this.userService.create(userDb)).pipe(
                    map((user)=>{
                        delete user.password;
                        return user;
                    })
                )
               
            })
        )
    }
    validateUser(email:string,password:string):Observable<UserEntity>{
        return from(this.userService.findUserBy({where:{email},select:['id','email','password']})).pipe(
            switchMap((user:UserEntity)=>{
                if(!user){
                    throw new ForbiddenException("user not found");
                }
                return from(this.comparePassword(password,user.password)).pipe(
                    map((matches:boolean)=>{
                        if(!matches){
                            throw new ForbiddenException("wrong password");
                        }
                        return user;
                    })
                )
            })
        )
    }
    login(user:SignInUserDTO):Observable<any>{
        const {email,password} = user;
        return this.validateUser(email,password).pipe(
            switchMap((user:UserEntity)=>{
                return from(this.jwtService.signAsync({sub:user.id,email:user.email,role:user.role},{secret:this.configService.get('JWT_SECRET')})).pipe(
                    map((jwt:string)=>({access_token:jwt}))
                )
            }),
           
        )
      
    }
}