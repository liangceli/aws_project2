import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

/** ROUTE IMPORTS */
import dashboardRoutes from "./routes/dashboardRoutes";
import productRoutes from "./routes/productRoutes";
import userRoutes from "./routes/userRoutes";
import expenseRoutes from "./routes/expenseRoutes";

/** CONFIGURATIONS */
dotenv.config();  /**初始化 dotenv，让环境变量可以被 process.env 访问。 */
const app = express(); /** 创建一个 Express 应用实例，app 代表 Express 服务器对象。*/
app.use(express.json()); /** 允许 Express 解析 JSON 格式的请求体（req.body）。有这个中间件，req.body 会是 undefined。*/
app.use(helmet()); /**helmet 是一个安全中间件，可以 保护 Express 应用免受常见的 Web 安全攻击。 */
app.use(helmet. crossOriginResourcePolicy({policy: "cross-origin"})); /**helmet.crossOriginResourcePolicy() 设置跨源资源策略（CORS 相关）。
                                                                            policy: "cross-origin" 允许不同来源的网站访问资源。
                                                                            适用于需要允许图片、字体等资源跨域加载的情况。 */
app.use(morgan("common")); /** morgan 是一个 HTTP 请求日志中间件，用于记录 API 访问日志。*/
app.use(bodyParser.json()); /**解析 JSON 格式的请求体。适用于 Content-Type: application/json 的请求 { "username": "john", "password": "1234" }*/
app.use(bodyParser.urlencoded({extended: false})); /**解析 application/x-www-form-urlencoded 请求体（表单数据）extended: false → 只能解析 key=value 形式的简单数据 列如：name=John&age=25 ==> { "name": "John", "age": "25" } true: user[name]=John&user[age]=25 ==> { "user": { "name": "John", "age": "25" } }*/
app.use(cors()); /**允许所有来源 如果前端（React/Vue）和后端（Express）运行在不同端口（如 3000 和 5000），浏览器默认会阻止请求，cors 允许跨域访问。 */

/**ROUTES*/
app.use("/dashboard", dashboardRoutes);
app.use("/products", productRoutes)
app.use("/users", userRoutes); 
app.use("/expenses", expenseRoutes);

/**SERVER */
const port = Number (process.env.PORT) || 3001;
app.listen(port, "0.0.0.0", () => {
    console.log(`Server running on port ${port}`); 
});