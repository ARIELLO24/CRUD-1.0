import { Request, Response } from "express";
import { TaskRepository } from "../repositories/TaskRepository";
import { TaskCreateDTO, TaskUpdateDTO } from "../dtos/TaskDTO";

const taskRepository = new TaskRepository();

export class TaskController {

    async create(req: Request, res: Response) {
        try {
            const { title, description, userId } = req.body;

            if (!title || !description || !userId) {
                return res.status(400).json({ message: "Missing required fields." });
            }

            const task = await taskRepository.create({ title, description, userId });
            return res.status(201).json(task);
        } catch (error) {
            return res.status(500).json({ message: "Internal server error." });
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const tasks = await taskRepository.findAll();
            return res.status(200).json(tasks);
        } catch (error) {
            return res.status(500).json({ message: "Internal server error." });
        }
    }

    async findById(req: Request, res: Response) {
        try {
        const id = Number(req.params.id);
        if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

        const task = await taskRepository.findById(id);
        if (!task) return res.status(404).json({ message: "Task not found" });

        return res.status(200).json(task);
        } catch (error) {
        return res.status(500).json({ message: "Internal server error." });
        }
    }

    async findAllByUserId(req: Request, res: Response) {
        try {
        const id = Number(req.params.userId);
        if (isNaN(id)) return res.status(400).json({ message: "Invalid User ID" });

        const tasks = await taskRepository.findAllByUserId(id);
        return res.status(200).json(tasks);
        } catch (error) {
        return res.status(500).json({ message: "Internal server error." });
        }
    }

    async findByIdWithUser(req: Request, res: Response) {
        try {
        const id = Number(req.params.id);
        if (isNaN(id)) return res.status(400).json({ message: "Invalid Task ID" });

        const task = await taskRepository.findByIdWithUser(id);
        if (!task) return res.status(404).json({ message: "Task not found" });

        return res.status(200).json(task);
        } catch (error) {
        return res.status(500).json({ message: "Internal server error." });
        }
    }

    async findUserWithTasks(req: Request, res: Response) {
        try {
            const userId = Number(req.params.userId);
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;

            if (isNaN(userId) || isNaN(page) || isNaN(limit)) {
                return res.status(400).json({ message: "Invalid parameters" });
            }

            const result = await taskRepository.findUserWithTasks(userId, page, limit);
            if (!result) return res.status(404).json({ message: "User not found" });

            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ message: "Internal server error." });
        }
    }

    async update(req: Request, res: Response) {
        try {
        const id = Number(req.params.id);
        const { title, description, status } = req.body;

        if (isNaN(id)) return res.status(400).json({ message: "Invalid Task ID" });

        const task = await taskRepository.findById(id);
        if (!task) return res.status(404).json({ message: "Task not found" });

        await taskRepository.update(id, { title, description, status } as TaskUpdateDTO);
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ message: "Internal server error." });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) return res.status(400).json({ message: "Invalid Task ID" });

            const task = await taskRepository.findById(id);
            if (!task) return res.status(404).json({ message: "Task not found" });

            await taskRepository.delete(id);
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ message: "Internal server error." });
        }
    }
}
