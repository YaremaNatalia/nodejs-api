import app from "./app.js";
import mongoose from "mongoose";

// process.env налаштування сервера куди можна додати секретну інформацію (ключі, паролі) lesson 3.1 time 1h-1.25h

const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(process.env.DB_HOST)
  .then(() => {
    app.listen(PORT, () => console.log("Database connection successful"));
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
