import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; // 从 Redux Toolkit Query 导入 createApi 和 fetchBaseQuery

// 定义产品接口
export interface Product {
  productId: string; // 产品 ID
  name: string; // 产品名称
  price: number; // 产品价格
  rating?: number; // 产品评分（可选）
  stockQuantity: number; // 产品库存数量
}

// 定义新产品接口（用于创建产品时）
export interface NewProduct {
  name: string; // 产品名称
  price: number; // 产品价格
  rating?: number; // 产品评分（可选）
  stockQuantity: number; // 产品库存数量
}

// 定义销售摘要接口
export interface SalesSummary {
  salesSummaryId: string; // 销售摘要 ID
  totalValue: number; // 总销售金额
  changePercentage?: number; // 变化百分比（可选）
  date: string; // 日期
}

// 定义采购摘要接口
export interface PurchaseSummary {
  purchaseSummaryId: string; // 采购摘要 ID
  totalPurchased: number; // 总采购数量
  changePercentage?: number; // 变化百分比（可选）
  date: string; // 日期
}

// 定义支出摘要接口
export interface ExpenseSummary {
  expenseSummarId: string; // 支出摘要 ID
  totalExpenses: number; // 总支出金额
  date: string; // 日期
}

// 定义按类别分类的支出摘要接口
export interface ExpenseByCategorySummary {
  expenseByCategorySummaryId: string; // 按类别分类的支出 ID
  category: string; // 支出类别
  amount: string; // 支出金额（以字符串存储，可能因为数据库的 Decimal 类型）
  date: string; // 日期
}

// 定义仪表盘数据接口，包含所有摘要数据
export interface DashboardMetrics {
  popularProducts: Product[]; // 热门产品列表
  salesSummary: SalesSummary[]; // 销售摘要
  purchaseSummary: PurchaseSummary[]; // 采购摘要
  expenseSummary: ExpenseSummary[]; // 支出摘要
  expenseByCategorySummary: ExpenseByCategorySummary[]; // 按类别分类的支出摘要
}

// 定义用户接口
export interface User {
  userId: string; // 用户 ID
  name: string; // 用户姓名
  email: string; // 用户邮箱
}

// 创建 API 配置
export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }), // 设置 API 基础 URL
  reducerPath: "api", // 定义 Redux slice 名称
  tagTypes: ["DashboardMetrics", "Products", "Users", "Expenses"], // 定义缓存标签
  endpoints: (build) => ({
    // 获取仪表盘数据
    getDashboardMetrics: build.query<DashboardMetrics, void>({
      query: () => "/dashboard", // 查询仪表盘数据的 API 路径
      providesTags: ["DashboardMetrics"], // 该 API 查询的数据被标记为 DashboardMetrics
    }),
    
    // 获取产品列表，可按搜索关键字筛选
    getProducts: build.query<Product[], string | void>({
      query: (search) => ({
        url: "/products", // 查询产品的 API 路径
        params: search ? { search } : {}, // 传递搜索参数（如果有）
      }),
      providesTags: ["Products"],
    }),
    
    // 创建新产品
    createProduct: build.mutation<Product, NewProduct>({
      query: (newProduct) => ({
        url: "/products", // 创建产品的 API 路径
        method: "POST", // 使用 POST 方法
        body: newProduct, // 发送产品数据
      }),
      invalidatesTags: ["Products"], // 使 Products 缓存失效，以便刷新数据
    }),
    
    // 获取用户列表
    getUsers: build.query<User[], void>({
      query: () => "/users", // 查询用户的 API 路径
      providesTags: ["Users"],
    }),
    
    // 获取按类别分类的支出数据
    getExpensesByCategory: build.query<ExpenseByCategorySummary[], void>({
      query: () => "/expenses", // 查询支出的 API 路径
      providesTags: ["Expenses"],
    }),
  }),
});

// 导出自动生成的 API hooks，用于组件调用 API
export const {
  useGetDashboardMetricsQuery, // 获取仪表盘数据的 hook
  useGetProductsQuery, // 获取产品列表的 hook
  useCreateProductMutation, // 创建产品的 hook
  useGetUsersQuery, // 获取用户列表的 hook
  useGetExpensesByCategoryQuery, // 获取按类别分类的支出数据的 hook
} = api;