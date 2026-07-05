import { ActiveStatus, Role } from "../../../generated/prisma/enums"

export interface IRegisterUserPayload {
name: string;
email:string;
password:string;
role?:Role;
status?:ActiveStatus;
profilePhoto?:string
}

export interface ILogininUserPayload {
    email:string;
    password:string
}