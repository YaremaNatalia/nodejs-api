import Contact from "../models/Contact.js";
import { HttpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, ...filterParams } = req.query;
  // пагінація: беремо з реквесту і за замовчуванням перша сторінка, на сторінці 20 обєктів
  const skip = (page - 1) * limit;
  // віднімаємо 1 від page, тому що сторінки зазвичай нумеруються з 1, але у програмуванні використовується індексація, яка починається з 0. Таким чином, (page - 1) дає індекс з 0 для першої сторінки, 1 для другої ...
  const filter = { owner, ...filterParams }; // фільтрація за власником завжди, а також розпилюємо (додаємо) за іншиим параметрами, якщо вони будуть вказані на фронтенді користувачем
  const totalCount = await Contact.countDocuments(filter); // загальна кількість обєктів
  const perPage = Number(limit);
  const contactsList = await Contact.find(filter, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "email"); // повернення всіх полів окрім createdAt та updatedAt
  res.json({ total: totalCount, perPage: perPage, contactsList });
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
  const { _id: owner } = req.user;
  const contactToAdd = await Contact.create({ ...req.body, owner });
  res.status(201).json(contactToAdd);
};

const updateById = async (req, res) => {
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
