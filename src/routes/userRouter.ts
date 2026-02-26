import express from 'express';
import { login, register } from '../services/userServices';


const router =express.Router();

router.post ('/register',async(req,res)=>{
    const {firstName, lastName, email, password} = req.body;
const {statuscode,data} = await register({firstName, lastName, email, password});
res.status(statuscode).send(data);
});
router.post('/login',async(req,res)=>{
    const {email,password} = req.body;
    const {statuscode,data} = await login({email,password});
    res.status(statuscode).send(data);
});
export default router;