export class CreatePostDTO{
    body:string;
    authorId:number;
}
export class UpdatePostDTO{
    body?:string;
    createdAt?:Date;
    authorId?:number;
}
