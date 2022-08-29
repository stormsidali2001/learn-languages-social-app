import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.enum";


@Entity('users')
export class User{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({unique:true})
    email:string;

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

    

}