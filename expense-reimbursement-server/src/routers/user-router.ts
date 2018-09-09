import { Request, Response } from 'express';
import express from 'express';
import * as userDao from '../daos/user-dao';

export const userRouter = express.Router();

//Gets a list of every user/manager
userRouter.get('', async (req: Request, resp: Response) => {
  try {
    console.log('retrieving all users');
    let users = await userDao.findAll();
    resp.json(users);
  } catch (err) {
    console.log(err);
    resp.sendStatus(500);
  }
});

//Gets a particular user by their ID
// userRouter.get('/:id',async(req:Request,resp:Response)=>{
//     const id = req.params.id;
//     try{
//         console.log('retrieving user with id: ' + id);
//         //refactor this
//         let user = await userDao.findAll();
//     }
//     catch(err){
//         console.log(err);
//         resp.sendStatus(500);
//     }
// });

//Attempts to login with supplied username and password, returns the user as a SqlUser object if successful
userRouter.post('/login', async (req: Request, resp: Response) => {
  try {
    console.log('attempting to login');
    const user = await userDao.findByUsernameAndPassword(req.body.username, req.body.password);

    if (user) {
      req.session.user = user;
      resp.json(user);
    } else {
      resp.sendStatus(401);
    }

  }
  catch (err) {
    console.log(err);
    resp.sendStatus(500);
  }
});

//Creates a new user(non-manager), returns the new user's ID if succesful
//Returns the 
userRouter.post('', async (req, resp) => {
  console.log('creating user')
  try {
    const id = await userDao.createUser(req.body);
    resp.status(201);
    resp.json(id);
  } catch (err) {
    if (err.code && (err.code == 23505)) {
      resp.status(400);
      resp.json({ "message": "username or email already exists" });
    }
    resp.sendStatus(500);

  }
})

userRouter.post('/logout', (req,resp)=>{
  req.session.user = null;
  resp.sendStatus(200);
})
