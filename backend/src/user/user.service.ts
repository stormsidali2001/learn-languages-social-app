import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { from, map, Observable } from "rxjs";
import { UserEntity } from "../core/entities/user.entity";
import { FindOneOptions, Repository, UpdateResult } from "typeorm";


@Injectable()
export class UserService{
    constructor(@InjectRepository(UserEntity) private readonly userRepository:Repository<UserEntity>){}
    findUserBy(options:FindOneOptions<UserEntity>):Observable<UserEntity>{
        return from(this.userRepository.findOne(options));
    }
    create(user:UserEntity){
       return from(this.userRepository.save(user));
    }

    findAll():Observable<UserEntity[]>{
        return from(this.userRepository.find());
    }
    updateProfileImage(id:number,imagePath:string):Observable<UpdateResult>{
        return from(this.userRepository.update(id,{imagePath}));
    }
    findProfileImagePath(id:number):Observable<string>{
        return from(this.userRepository.findOne({where:{id}})).pipe(
            map((user:UserEntity)=>user.imagePath)
        );
    }
}