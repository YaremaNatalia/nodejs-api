import express from "express";
import logger from "morgan";
import cors from "cors";

import contactsRouter from "./routes/api/contacts-router.js";
import authRouter from "./routes/api/auth-router.js";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short"; //виведення інф в консоль залежно від запуску dev або start

app.use(logger(formatsLogger)); // виведення в консоль інфо про запити (метод, адреса, статус відповіді)
app.use(cors()); // midlware що дозволяє кросдоменні запити (з одного домену на інший)
app.use(express.json()); // midlware що записує в req.body запит в форматі json

app.use("/api/contacts", contactsRouter);
app.use("/api/auth", authRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

export default app;
