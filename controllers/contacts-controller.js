import Contact from "../models/Movie.js";
import { HttpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";

const getAll = async (req, res) => {
  const contactsList = await Contact.find({}, "-createdAt -updatedAt"); // повернення всіх полів окрім createdAt та updatedAt
  res.json(contactsList);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  // const contactById = await Contact.findOne({ _id: contactId }); // пошук за критерієм (_id)
  const contactById = await Contact.findById(contactId);
  if (!contactById) {
    throw HttpError(404, `Contact with id=${contactId} not found`);
  }
  res.json(contactById);
};

const add = async (req, res) => {
  const contactToAdd = await Contact.create(req.body);
  res.status(201).json(contactToAdd);
};

const updateById = async (req, res) => {
  if (!Object.keys(req.body).length) {
    res.status(400).json({ message: "Missing fields" });
    return;
  }
  const { contactId } = req.params;
  const contactToUpdate = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!contactToUpdate) {
    throw HttpError(404, `Contact with id=${contactId} not found`);
  }
  res.json(contactToUpdate);
};

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const contactToDelete = await Contact.findByIdAndDelete(contactId);
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
