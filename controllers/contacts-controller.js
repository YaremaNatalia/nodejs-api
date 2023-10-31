import contactsServices from "../models/contacts.js";
import { HttpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";

const getAll = async (req, res) => {
  const contactsList = await contactsServices.listContacts();
  res.json(contactsList);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const contactById = await contactsServices.getContactById(contactId);
  if (!contactById) {
    throw HttpError(404, `Contact with id=${contactId} not found`);
  }
  res.json(contactById);
};

const add = async (req, res) => {
  const contactToAdd = await contactsServices.addContact(req.body);
  res.status(201).json(contactToAdd);
};

const updateById = async (req, res) => {
  if (!Object.keys(req.body).length) {
    res.status(400).json({ message: "Missing fields" });
    return;
  }
  const { contactId } = req.params;
  const contactToUpdate = await contactsServices.updateContactById(
    contactId,
    req.body
  );
  if (!contactToUpdate) {
    throw HttpError(404, `Contact with id=${contactId} not found`);
  }
  res.json(contactToUpdate);
};

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const contactToDelete = await contactsServices.deleteContactById(contactId);
  if (!contactToDelete) {
    throw HttpError(404, "Contact not found");
  }
  // res.json(contactToDelete);
  // res.status(204).send();
  res.json({ message: "Contact deleted" });
};

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};
