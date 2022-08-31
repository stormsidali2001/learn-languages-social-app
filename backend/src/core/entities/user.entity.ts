import { FeedPostEntity } from "./post.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../dtos/role.enum";


@Entity('users')
export class UserEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({unique:true})
    email:string;

    @Column({select:false})
    password:string;

    @Column()
    firstName:string;

    @Column()
    lastName:string;

    @Column({
        type:'enum',
        default:Role.USER,
        enum:Role
    })
    role:Role;

    @Column({
        nullable:true,

    })
    imagePath:string;

    //relations
    @OneToMany(type=>FeedPostEntity,f=>f.author)
    feedPosts:FeedPostEntity[];

}