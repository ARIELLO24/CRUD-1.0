import { Router } from "express";
import { TaskController } from "../controllers/TaskController";

const taskRouter = Router();
const taskController = new TaskController();

taskRouter.get("/tasks", taskController.findAll);
taskRouter.get("/tasks/:id", taskController.findById);
taskRouter.get("/tasks/:id/user", taskController.findByIdWithUser);
taskRouter.get("/tasks/user/:userId", taskController.findAllByUserId);
taskRouter.get("/users/:userId/tasks", taskController.findUserWithTasks);
taskRouter.put("/tasks/:id", taskController.update);
taskRouter.post("/tasks", taskController.create);
taskRouter.delete("tasks/:id", taskController.delete);

export default taskRouter;
