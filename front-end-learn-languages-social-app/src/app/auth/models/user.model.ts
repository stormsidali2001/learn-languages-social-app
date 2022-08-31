export type Role = 'admin' | 'premium' | 'user';
export interface User{
    sub:number;
    firstName:string;
    lastName:string;
    email:string;
    role:Role;
    imagePath:string;
}