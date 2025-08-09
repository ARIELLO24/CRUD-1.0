export interface TaskCreateDTO {
    title: string
    description: string
    userId: number
}
export interface TaskUpdateDTO {
    id: number
    title: string
    description: string
    status: string
}
export interface TaskResponseDTO {
    id: number
    title: string
    description: string
    status: string
    userId?: number
    user?: {
        name?: string
        email?: string
    }
}
export interface UserTasksDTO {
    id: number
    name: string
    email: string
    tasks: TaskResponseDTO[]
}
