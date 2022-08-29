import { UserEntity } from "./user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";

@Entity('feed_post')
export class FeedPostEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({default:''})
    body:string;

    @CreateDateColumn({type:'timestamp'})
    createdAt:Date;

    //relations 
    @ManyToOne(type=>UserEntity,p=>p.feedPosts)
    author:UserEntity;
}