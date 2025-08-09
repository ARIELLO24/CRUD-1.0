import { connection } from "../config/database";
import { TaskCreateDTO, TaskResponseDTO, TaskUpdateDTO, UserTasksDTO } from "../dtos/TaskDTO";

export class TaskRepository {

    async create(data: TaskCreateDTO): Promise<TaskResponseDTO> {
        const {title, description, userId} = data
        const status = "pending"
        const [result]: any = await connection.query(
            'INSERT INTO tasks (title, description, status, user_id) VALUES (?, ?, ?, ?)',
            [title, description, status, userId]
        )

        return {
            id: result.insertId,
            title,
            description,
            status,
            userId
        }
    }
    
    async findAll(): Promise<TaskResponseDTO[]> {
        const [rows]: any = await connection.query('SELECT * FROM tasks')

        return rows.map((row: any) => ({
            id: row.id,
            title: row.title,
            description: row.description,
            status: row.status,
            userId: row.user_id
        }))
    }

    async findById(id: number): Promise<TaskResponseDTO | null> {
        const [rows]: any = await connection.query(
            'SELECT * FROM tasks WHERE id = ?', [id]
        );

        if (rows.length === 0) return null;

        return {
            id: rows[0].id,
            title: rows[0].title,
            description: rows[0].description,
            status: rows[0].status,
            userId: rows[0].user_id
        };
    }

    async findAllByUserId(id: number): Promise<TaskResponseDTO | null> {
        const [rows]: any = await connection.query(
            'SELECT * FROM tasks WHERE user_id = ?', [id]
        )

        return rows.map((row: any) => ({
            id: row.id,
            title: row.title,
            description: row.description,
            status: row.status,
            userId: row.user_id
        }))
    }

    async findByIdWithUser(taskId: number): Promise<TaskResponseDTO | null> {
        const [rows]: any = await connection.query(
            `SELECT 
                t.id AS task_id,
                t.title,
                t.description,
                t.status,
                t.user_id,
                u.name AS user_name,
                u.email AS user_email
            FROM tasks t
            JOIN users u ON t.user_id = u.id
            WHERE t.id = ?`,
            [taskId]
        );

        if (rows.length === 0) {
            return null; 
        }

        const row = rows[0];

        return {
            id: row.task_id,
            title: row.title,
            description: row.description,
            status: row.status,
            userId: row.user_id,
            user: {
                name: row.user_name,
                email: row.user_email
            }
        };
    }

    async findUserWithTasks(userId: number, page: number, limit: number): Promise<UserTasksDTO | null> {
        const offset = (page - 1) * limit;

        const [userRows]: any = await connection.query(
            'SELECT id, name, email FROM users WHERE id = ?',
            [userId]
        );
        if (userRows.length === 0) {
            return null; // usuário não encontrado
        }

        const user = userRows[0];
        const [taskRows]: any = await connection.query(
            'SELECT id, title, description, status FROM tasks WHERE user_id = ? LIMIT ? OFFSET ?',
            [userId, limit, offset]
        );
        
        return {
            ...user,
            tasks: taskRows.map((row: any) => ({
                id: row.id,
                title: row.title,
                description: row.description,
                status: row.status,
            }))
        };
    }
    async update(id: number, data: TaskUpdateDTO): Promise<void> {
        const { title, description, status } = data;
        await connection.query(
            'UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?',
            [title, description, status, id]
        );
    }

    async delete(id: number): Promise<void> {
        await connection.query('DELETE FROM tasks WHERE id = ?', [id]);
    }
}