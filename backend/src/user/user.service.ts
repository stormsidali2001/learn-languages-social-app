import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { from, Observable } from "rxjs";
import { UserEntity } from "../core/entities/user.entity";
import { FindOneOptions, Repository } from "typeorm";


@Injectable()
export class UserService{
    constructor(@InjectRepository(UserEntity) private readonly userRepository:Repository<UserEntity>){}
    findUserBy(options:FindOneOptions<UserEntity>):Observable<UserEntity>{
        return from(this.userRepository.findOne(options));
    }
    create(user:UserEntity){
       return from(this.userRepository.save(user));
    }
}