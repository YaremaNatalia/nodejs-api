import { Schema, model } from "mongoose";
import Joi from "joi"; // бібліотека для валідації
import { handleSaveError, runValidateAtUpdate } from "./hooks.js";

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
); // versionKey: false щоб прибрати прописування версії, timestamps: true для прописування дати додавання та оновлення обєкту

contactSchema.post("save", handleSaveError); // при помилці у відповідності схеми вмкмдуємо статус 400
contactSchema.pre("findOneAndUpdate", runValidateAtUpdate); // примусова перевірка відповідності за схемою перед оновленням обєкта
contactSchema.post("findOneAndUpdate", handleSaveError); // коригування статусу помилки (на 400) при оновленні обєкта

// СТВОРЕННЯ СХЕМИ ВАЛІДАЦІЇ ОБЄКТА JOI
export const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "missing required name field",
  }),
  email: Joi.string().required().messages({
    "any.required": "missing required email field",
  }),
  phone: Joi.string().required().messages({
    "any.required": "missing required phone field",
  }),
  favorite: Joi.boolean(),
});

export const contactUpdateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
});

export const movieUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const Contact = model("contact", contactSchema);

export default Contact;
