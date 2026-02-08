export enum Role{
USER="user",
ADMIN="admin"
}

export interface UserPayload{
    name:string;
    email:string;
    password:string;
    role:Role;
    isVerified:boolean;
    isDeleted:boolean;
    
}


export interface IJwtPayload{
    id:string;
    name:string;
    email:string;
    role:Role
}