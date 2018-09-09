import { Request, Response } from 'express';
import express from 'express';
import { authMiddleware } from '../security/authorization-middleware';
import * as reimbursementDao from '../daos/reimbursement-dao';
export const reimbursementRouter = express.Router();

reimbursementRouter.get('', [authMiddleware("MANAGER"), async (req, resp) => {
    try {
        let reimbursements = await reimbursementDao.findAll();
        resp.json(reimbursements);
    }
    catch (err) {
        resp.sendStatus(500);
    }
}]);

reimbursementRouter.post('', [authMiddleware("MANAGER","USER"),async (req, resp) => {
    console.log('creating reimbursement')
    try {
        const id = await reimbursementDao.createReimbursement(req.body);
        resp.status(201);
        resp.json(id);
    } catch (err) {
        console.log(err);
        resp.sendStatus(500);
    }
}]);

reimbursementRouter.patch('', [authMiddleware("MANAGER"), async (req, resp) => {
    console.log('updating a reimbursement');
    try {
        await reimbursementDao.resolveReimbursement(req.body);
        resp.sendStatus(201);
    }
    catch (err) {
        console.log(err);
        resp.sendStatus(500);
    }
}]);

reimbursementRouter.get('/:creator', [authMiddleware("USER","MANAGER"),async (req,resp)=>{
    const creator = +req.params.creator;
    try {
        let reimbursements = await reimbursementDao.findAll();
        let filteredReimbursements = reimbursements.filter((reimbursement)=>{
            if (reimbursement.author === creator){
                return true;
            }
            else{
                return false;
            }
        })
        if (filteredReimbursements.length != 0){
            resp.json(filteredReimbursements);
        }
        else {
            resp.sendStatus(404);
        }
        
    }
    catch (err) {
        resp.sendStatus(500);
    }
}]);