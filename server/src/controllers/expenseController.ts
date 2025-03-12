import { Request, Response } from "express";  // 从 Express 导入 Request 和 Response 类型
import { PrismaClient } from "@prisma/client"; // 导入 PrismaClient 以连接数据库

const prisma = new PrismaClient(); // 创建 Prisma 客户端实例

export const getExpenseByCategory = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const expenseByCategorySummaryRaw = await prisma.expenseByCategory.findMany(
            {
                orderBy: {
                    date: "desc",
                },
            }
        );

        const expenseByCategorySummary = expenseByCategorySummaryRaw.map(
            (item) => ({
                ...item,
                amount: item.amount.toString()
            })
        );

        res.json(expenseByCategorySummary)
    } catch (error) {
        res.status(500).json({message:"Error retrieving expenses by category"});
    }
};