export class CreatePostDTO{
    id?:number;
    body?:string;
    createdAt?:Date;
    authorId?:number;
}
export class UpdatePostDTO{
    body?:string;
    createdAt?:Date;
    authorId?:number;
}
