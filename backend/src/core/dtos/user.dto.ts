import { Role } from "./role.enum";

export class registerUserDTO{
    firstName?:string;
    lastName?:string;
    email?:string;
    password?:string;
    role?:Role;
}
export class SignInUserDTO{
    email:string;
    password:string;
}