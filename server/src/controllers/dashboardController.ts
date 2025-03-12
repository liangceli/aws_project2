import { Request, Response } from "express";  // 从 Express 导入 Request 和 Response 类型
import { PrismaClient } from "@prisma/client"; // 导入 PrismaClient 以连接数据库

const prisma = new PrismaClient(); // 创建 Prisma 客户端实例

/**
 * 获取仪表盘指标数据
 * @param req Express 请求对象
 * @param res Express 响应对象
 */
export const getDashboardMetrics = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        // 获取 库存最多 的前 15 个产品。
        const popularProducts = await prisma.products.findMany({
            take: 15,
            orderBy: {
              stockQuantity: "desc", // 按照 stockQuantity（库存数量）从高到低排序，优先获取库存最多的产品。
            },
          });
        //   获取最近 5 笔销售记录。
          const salesSummary = await prisma.salesSummary.findMany({
            take: 5,
            orderBy: {
              date: "desc", //按照 date（销售日期）从最新到最旧排序。
            },
          });
        //   获取最近 5 笔采购记录。
          const purchaseSummary = await prisma.purchaseSummary.findMany({
            take: 5,
            orderBy: {
              date: "desc", //按照 date（采购日期）从最新到最旧排序。
            },
          });
        //   获取最近 5 笔支出记录。
          const expenseSummary = await prisma.expenseSummary.findMany({
            take: 5,
            orderBy: {
              date: "desc",
            },
          });

        //   获取最近 5 笔按类别分类的支出记录。
          const expenseByCategorySummaryRaw = await prisma.expenseByCategory.findMany(
            {
              take: 5,
              orderBy: {
                date: "desc",
              },
            }
          );
        //   将 amount（金额）字段转换为字符串格式。
          const expenseByCategorySummary = expenseByCategorySummaryRaw.map(
            (item) => ({
              ...item,
              amount: item.amount.toString(),
            })
          );

        //   返回 JSON 数据 列如 popularProducts": [...],
          res.json({
            popularProducts,
            salesSummary,
            purchaseSummary,
            expenseSummary,
            expenseByCategorySummary,
          });
        
    } catch (error) {
        // 捕获异常并返回 500 错误
        res.status(500).json({ message: "Error retrieving dashboard metrics" });
    }
};

