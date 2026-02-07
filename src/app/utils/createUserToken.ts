import jwt, { Secret, SignOptions } from "jsonwebtoken";
import config from "../../config";
export const createUserToken=(user:any)=>{
    const payload={
        id:user.id,
        name:user.name,
        email:user.email,
        role:user.role
    }

    const token=jwt.sign(payload,config.jwt.access_secret as Secret,{expiresIn:config.jwt.access_expires_in} as SignOptions)

    return{
        accessToken:token
    }
}