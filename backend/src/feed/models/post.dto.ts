export class CreatePostDTO{
    id?:number;
    body?:string;
    createdAt?:Date;
}
export class UpdatePostDTO{
    body?:string;
    createdAt?:Date;
}
