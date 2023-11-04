import { validateBody } from "../../decorators/index.js";
import contactSchemas from "../../schemas/contact-schemas.js";

const addValidateContact = validateBody(contactSchemas.contactAddSchema);
const updateValidateContact = validateBody(contactSchemas.contactUpdateSchema);

export default { addValidateContact, updateValidateContact };
