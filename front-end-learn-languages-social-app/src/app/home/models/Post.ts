import { User } from "src/app/auth/models/user.model";

export interface Post{
    id:number;
    body:string;
    createdAt:Date;
    author:{
        firstName:string;
        lastName:string;
        id:number;
        imagePath:string;
    };
}