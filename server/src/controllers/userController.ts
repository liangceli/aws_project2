import { Request, Response } from "express";  // 从 Express 导入 Request 和 Response 类型
import { PrismaClient } from "@prisma/client"; // 导入 PrismaClient 以连接数据库

const prisma = new PrismaClient(); // 创建 Prisma 客户端实例 

export const getUsers = async(req: Request, res: Response): Promise<void> => {
    try {
        const users = await prisma.users.findMany();
        res.json(users);
    } catch (error) {
        res.status(500).json({message: "Error to get users"})
    }
}