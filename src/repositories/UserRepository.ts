import { connection } from "../config/database";
import { UserCreateDTO, UserResponseDTO } from "../dtos/UserDTO";

export class UserRepository {

    async create(data: UserCreateDTO): Promise<UserResponseDTO> {
        const {name , email} = data

        const [result]: any = await connection.query(
            'INSERT INTO users (name, email) VALUES (?, ?)',
            [name, email]
        )

        return {
            id: result.insertId,
            name,
            email
        }
    }

    async findAll(): Promise<UserResponseDTO[]> {
        const [rows]: any = await connection.query('SELECT id, name, email FROM users');
        return rows.map((row: any) => ({
            id: row.id,
            name: row.name,
            email: row.email
        }));
    }

    async findById(id: number): Promise<UserResponseDTO | null> {
        const [rows]: any = await connection.query(
            'SELECT id, name, email FROM users WHERE id = ?', [id]
        );

        if (rows.length === 0) return null;

        return {
            id: rows[0].id,
            name: rows[0].name,
            email: rows[0].email
        };
    }

    async update(id: number, data: UserCreateDTO): Promise<void> {
        const { name, email } = data;
        await connection.query(
            'UPDATE users SET name = ?, email = ? WHERE id = ?', 
            [name, email, id]
        );
    }

    async delete(id: number): Promise<void> {
        await connection.query('DELETE FROM users WHERE id = ?', [id]);
    }
}