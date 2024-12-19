import { User } from "./user";

export interface Blog {
    id: number,
    title: string,
    thumbnail: string,
    description: string,
    category: string,
    userId: number,
    content: string,
    createdAt: string,
    updatedAt: string

    user: Pick<User, "id" | "name" | "email">
}