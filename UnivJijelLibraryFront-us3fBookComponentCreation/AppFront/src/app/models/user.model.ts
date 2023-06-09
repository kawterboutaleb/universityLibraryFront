import { Role } from "./role.model";


export class User
{

  id: number;
  firstname: string;
  lastname: string;
  email: string;
  username:string;
  password: string;
  role: Role;
  token: string;



    /*id!: number;
    firstname!: string;
    lastname!: string;
    password!: string;
    email!: string;
    usr_role!: string;*/
}