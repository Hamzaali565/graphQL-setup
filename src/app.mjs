import express from "express";
import booklistRouter from "./routes/Booklist.routes/Booklist.routes.mjs";
const app = express();

app.use(express.json());

app.use("/api/v1", booklistRouter);

export { app };
