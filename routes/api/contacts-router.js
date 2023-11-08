import express from "express";

import contactsCotroller from "../../controllers/contacts-controller.js";

import { validateBody } from "../../decorators/index.js";
import * as contactSchemas from "../../models/Contact.js"; // іменований експорт всіх схем
import { isValidId } from "../../middlewares/index.js"; // виклик мідлвари для обробки помилки якщо неправильний id

const addValidateContact = validateBody(contactSchemas.contactAddSchema);
const updateValidateContact = validateBody(contactSchemas.contactUpdateSchema);
const updateValidateContactFavorite = validateBody(
  contactSchemas.movieUpdateFavoriteSchema
);

const contactsRouter = express.Router(); //створення обєкту з групою маршрутів

contactsRouter.get("/", contactsCotroller.getAll);

contactsRouter.get("/:contactId", isValidId, contactsCotroller.getById);

contactsRouter.post("/", addValidateContact, contactsCotroller.add);

contactsRouter.put(
  "/:contactId",
  isValidId,
  updateValidateContact,
  contactsCotroller.updateById
);

contactsRouter.patch(
  "/:contactId/favorite",
  isValidId,
  updateValidateContactFavorite,
  contactsCotroller.updateById
);

contactsRouter.delete("/:contactId", isValidId, contactsCotroller.deleteById);

export default contactsRouter;
