import { Router } from "express";
import { UserController } from "../controllers/UserController";

const userRouter = Router()

const userController = new UserController()

userRouter.get('/users', userController.list)
userRouter.get('/users/:id', userController.getById)
userRouter.post('/users', userController.create)
userRouter.put('/users/:id', userController.update)
userRouter.delete('/users/:id', userController.delete)

export default userRouter