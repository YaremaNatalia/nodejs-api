import { HttpError } from "../helpers/index.js";

const isEmptyBody = async (req, res, next) => {
  const keys = Object.keys(req.body); // ключі в обєкті запиту
  if (!keys.length) {
    return next(HttpError(400, "Missing fields"));
  }
  next(); // якщо немає ключів в обєкті запиту (довжина їх масиву 0) перериваємо і видаємо помилку
};

export default isEmptyBody;
