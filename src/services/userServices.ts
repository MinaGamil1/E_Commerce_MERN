import { userModel } from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
interface RegisterParams
{
    firstName:string,
    lastName:string,
    email:string
    password:string
}
export const register =async ({firstName,lastName,email,password}:RegisterParams)=>
    {
        const findUser =await userModel.findOne({email})

        if(findUser){
            return{data:"user already exists!",statuscode:400}
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = new userModel ({firstName,lastName,email,password:hashedPassword})
        await newUser.save()
        return {data:generateJWT({firstName,lastName,email}),statuscode:200};

    }
interface loginParams
{
    email:string,
    password:string
}
export const login =async ({email,password}:loginParams)=>
    {
        const findUser = await userModel.findOne({email})

        if(!findUser)
            {
                return{data:"incorrect email or password!",statuscode:400}
            }

        const passwordMatch = await bcrypt.compare(password,findUser.password)
            if(passwordMatch)
                {
                    return {data:generateJWT({email,firstName:findUser.firstName,lastName:findUser.lastName}),statuscode:200}
                }
            return{data:"incorrect email or password!",statuscode:400}
    }
    const generateJWT = (data:any)=>
    {
        return jwt.sign(data , "b$p)|3I0=4JO+@AA", {expiresIn:"24h"})
    }