import { NextFunction, request, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { userModel } from "../models/userModel";

interface ExtendedRequest extends Request {
    
        user?: any;
    
}

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
    jwt.verify(token, "b$p)|3I0=4JO+@AA",async (err, payload) => {
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