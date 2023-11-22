import app from "./app.js";
import mongoose from "mongoose";

// process.env налаштування сервера куди можна додати секретну інформацію (ключі, паролі)

// const DB_HOST =
//   "mongodb+srv://YaremaNata:o7pESaJvGKKiaesU@cluster0.gw3gcg9.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose
  .connect(process.env.DB_HOST)
  .then(() => {
    app.listen(3000, () => console.log("Database connection successful"));
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
