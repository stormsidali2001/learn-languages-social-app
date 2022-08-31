export class CreatePostDTO{
    body:string;
}
export class UpdatePostDTO{
    body?:string;
    createdAt?:Date;
    authorId?:number;
}