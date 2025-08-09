import { Router } from "express";

import taskRoutes from "./taskRouter";
import userRoutes from "./userRouter";

const routes = Router();

routes.use(userRoutes)
routes.use(taskRoutes)

export default routes;