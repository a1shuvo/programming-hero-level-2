import express, { Request, Response } from "express";
import config from "./config";
import initDB from "./config/DB";
import logger from "./middleware/logger";
import { authRoutes } from "./modules/auth/auth.routes";
import { todoRoutes } from "./modules/todo/todo.routes";
import { userRoutes } from "./modules/user/user.routes";

const app = express();
const port = config.port;

// parser
app.use(express.json());
// app.use(express.urlencoded());

// initializing DB
initDB();

app.get("/", logger, (req: Request, res: Response) => {
  res.send("Hello Next Level Developers!");
});

// users CRUD
app.use("/users", userRoutes);

// todos CRUD
app.use("/todos", todoRoutes);

// auth Routes
app.use("/auth", authRoutes);

// Handle undefined routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found!",
    path: req.path,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
