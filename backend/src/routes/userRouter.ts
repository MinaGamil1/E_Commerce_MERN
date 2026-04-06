import express from 'express';
import { getMyOrders, login, register } from '../services/userServices';
import validateJWT from '../middlewares/validateJWT';
import { ExtendedRequest } from '../types/extendedRequest';


const router =express.Router();

router.post ('/register',async(req,res)=>{
    try {
    const {firstName, lastName, email, password} = req.body;
const {statuscode,data} = await register({firstName, lastName, email, password});
res.status(statuscode).json(data);} catch (error) {
    res.status(500).json({ error: "something went wrong" });
}
});
router.post('/login',async(req,res)=>{
    try {
        const {email,password} = req.body;
        const {statuscode,data} = await login({email,password});
        res.status(statuscode).json(data);
    } catch (error) {
        res.status(500).send("something went wrong");
    }
});
router.get('/my-orders',validateJWT ,async(request:ExtendedRequest,respose) => {
    try {
        const userId = request?.user?._id;
        const {statuscode,data} = await getMyOrders({userId});
        respose.status(statuscode).send(data);
    } catch (err) {
        respose.status(500).send( "something went wrong" );
    }
});

export default router;