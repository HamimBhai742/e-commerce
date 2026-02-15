import jwt, { Secret, SignOptions } from "jsonwebtoken";
import config from "../../config";
export const forgetPassTempToken=(user:any,expiresIn:string)=>{
    const payload={
        id:user.id,
        name:user.name,
        email:user.email,
        role:user.role
    }

    const token=jwt.sign(payload,config.jwt.access_secret as Secret,{expiresIn} as SignOptions)

    return{
        tempToken:token
    }
}