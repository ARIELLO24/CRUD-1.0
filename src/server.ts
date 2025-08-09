import express, { Application } from "express";
import routes from "./routes/index";

const app: Application = express();
const PORT: number = Number(process.env.PORT) || 3000;

app.use(express.json()); 

app.use(routes); 

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
})