import { Request, Response } from 'express';
import express from 'express';

export const userRouter = express.Router();

userRouter.get('',(req:Request,resp:Response)=>{
    console.log('Hello')
});