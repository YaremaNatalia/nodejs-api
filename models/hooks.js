export const handleSaveError = (error, data, next) => {
  const { name, code } = error;
  error.status = (name === "MongoServerError" && code === 11000)? 409: 400;
  next();
}; // при помилці у відповідності схемі вручну викидуємо статус 400

export const runValidateAtUpdate = function (next) {
  this.options.runValidators = true;
  next();
};// примусова перевірка відповідності за схемою перед оновленням обєкта 