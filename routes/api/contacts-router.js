import express from "express";

import contactsCotroller from "../../controllers/contacts-controller.js";
import contactsValidation from "../../middleware/validation/contacts-validation.js";

const contactsRouter = express.Router(); //створення обєкту з групою маршрутів

contactsRouter.get("/", contactsCotroller.getAll);

contactsRouter.get("/:contactId", contactsCotroller.getById);

contactsRouter.post(
  "/",
  contactsValidation.addValidateContact,
  contactsCotroller.add
);

contactsRouter.delete("/:contactId", contactsCotroller.deleteById);

contactsRouter.put(
  "/:contactId",
  contactsValidation.updateValidateContact,
  contactsCotroller.updateById
);

export default contactsRouter;
