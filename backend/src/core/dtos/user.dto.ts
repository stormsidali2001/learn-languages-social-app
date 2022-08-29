import { Role } from "./role.enum";

export class RegisterUserDTO{
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