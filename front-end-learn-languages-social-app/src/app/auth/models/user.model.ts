export type Role = 'admin' | 'premium' | 'user';
export interface User{
    id:number;
    firstName:string;
    lastName:string;
    email:string;
}