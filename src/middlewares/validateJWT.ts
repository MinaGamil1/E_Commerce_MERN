import { NextFunction,  Response } from "express";
import jwt from "jsonwebtoken";
import { userModel } from "../models/userModel";
import { ExtendedRequest } from "../types/extendedRequest";


const validateJWT = (req: ExtendedRequest, res: Response, next: NextFunction) => {
const authorizationHeader = req.get('authorization');
if (!authorizationHeader) {
    res.status(403).send( 'Authorization header was not provided' );
    return;
    }
const token = authorizationHeader.split(" ")[1];
if (!token) {
    res.status(403).send('Bearer Token was not provided' );
    return;
    }
    jwt.verify(token, "b1ca21fc2cfeb79bc5a14300bb998f7c6496c12d2668d92f66742f5d713e5732",async (err, payload) => {
    if (err) {
        res.status(403).send( 'Invalid token' );
        return;
    }
    if(!payload)
        {
            res.status(403).send('Invalid token' );
            return;
        }
        const userPayload = payload as {email:string,firstName:string,lastName:string};

    const user =await userModel.findOne({ email:userPayload.email });
    req.user = user;
    next();
});
};

export default validateJWT;