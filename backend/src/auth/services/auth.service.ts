import {HttpCode, HttpException, Injectable} from '@nestjs/common'
import { from, map, Observable, pipe, switchMap } from 'rxjs';
import * as bcrypt from 'bcrypt';
import { registerUserDTO } from 'src/auth/models/user.dto';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/core/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService{
    constructor(
        // @InjectRepository(UserEntity) private readonly userRepository:Repository<UserEntity>
        ){}
    hashPassword(password:string):Observable<string>{
        return from(bcrypt.hash(password,12));
    }
    comparePassword(password,passwordDb){
        return from(bcrypt.compare(password,passwordDb));
    }
    // registerUser(user:registerUserDTO):Observable<UserEntity>{
    //     const {email,password,firstName,lastName} = user;
    //     return this.hashPassword(password).pipe(
    //         switchMap((passwordHash:string)=>{
    //             const userDb = this.userRepository.create({email,firstName,lastName,passwordHash}); 
    //             return from(this.userRepository.save(userDb)).pipe(
    //                 map((user)=>{
    //                     const {passwordHash,...others} = user;
    //                     return others as UserEntity;
    //                 })
    //             )
               
    //         })
    //     )
    // }
}