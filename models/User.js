import { Schema, model } from "mongoose";
import Joi from "joi";
import { handleSaveError, runValidateAtUpdate } from "./hooks.js";

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Add your name"],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Add your email"],
      unique: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, "Set password"],
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
  },
  { versionKey: false, timestamps: true }
); // versionKey: false щоб прибрати прописування версії, timestamps: true для прописування дати додавання та оновлення обєкту

userSchema.post("save", handleSaveError); // при помилці у відповідності схеми вмкмдуємо статус 400
userSchema.pre("findOneAndUpdate", runValidateAtUpdate); // примусова перевірка відповідності за схемою перед оновленням обєкта
userSchema.post("findOneAndUpdate", handleSaveError); // коригування статусу помилки (на 400) при оновленні обєкта

export const userSignupSchema = Joi.object({
  username: Joi.string().required().messages({
    "any.required": "missing required username field",
  }),
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": "missing required email field",
  }),
  password: Joi.string().min(6).required().messages({
    "any.required": "missing required phone field",
  }),
  subscription: Joi.string(),
});

export const userSigninSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": "missing required email field",
  }),
  password: Joi.string().min(6).required().messages({
    "any.required": "missing required phone field",
  }),
});

const User = model("user", userSchema);

export default User;
