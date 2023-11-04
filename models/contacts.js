import fs from "fs/promises";
import { nanoid } from "nanoid";
import path from "path";

const contactsPath = path.resolve("models", "contacts.json"); //універсальний шлях, застосовуючи path.resolve, що склеює частинки шляхів
const updateContacts = (contacts) =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

export const listContacts = async () => {
  const list = await fs.readFile(contactsPath);
  return JSON.parse(list);
};

export const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((item) => item.id === contactId);
  return contact || null;
};

export const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();

  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await updateContacts(contacts); // в JSON.stringify додаємо оновлений список контактів, далі параметр додаткової функції(нам не потрібно, тому нуль) і кількість пробілів щоб файл був не в одну строку (1 або більше, оптимально 2)
  return newContact;
};

export const deleteContactById = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [newList] = contacts.splice(index, 1); // використовуємо splice, який вирізає і повертає обєкт у вигляді масиву. Деструктуризуємо його
  await updateContacts(contacts);
  return newList;
};

export const updateContactById = async (id, data) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  const updatedContact = { ...contacts[index], ...data }; // Об'єднання даних контакту з переданими даними для оновлення для збереження всіх даних у випадку оновлення лише одного параметру
  contacts[index] = updatedContact; 
  await updateContacts(contacts);
  return contacts[index];
};

export default {
  listContacts,
  getContactById,
  deleteContactById,
  addContact,
  updateContactById,
};
