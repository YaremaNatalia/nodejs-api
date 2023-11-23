import app from "./app.js";
import mongoose from "mongoose";

// process.env налаштування сервера куди можна додати секретну інформацію (ключі, паролі)

const { DB_HOST, PORT } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => console.log("Database connection successful"));
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
