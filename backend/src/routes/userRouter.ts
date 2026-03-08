import express from 'express';
import { login, register } from '../services/userServices';


const router =express.Router();

router.post ('/register',async(req,res)=>{
    try {
    const {firstName, lastName, email, password} = req.body;
const {statuscode,data} = await register({firstName, lastName, email, password});
res.status(statuscode).send(data);} catch (error) {
    res.status(500).send("something went wrong");
}
});
router.post('/login',async(req,res)=>{
    try {
        const {email,password} = req.body;
        const {statuscode,data} = await login({email,password});
        res.status(statuscode).send(data);
    } catch (error) {
        res.status(500).send("something went wrong");
    }
});
export default router;