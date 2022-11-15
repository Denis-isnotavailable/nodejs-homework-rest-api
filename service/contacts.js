const { Contact } = require("../db/contactSchema");
const { WrongParametrsError } = require("../helpers/error");

const getAllContactsService = async (userId, page, limit, favorite) => {
    const contacts = await Contact
        .find(favorite ? { userId, favorite: favorite } : { userId })       
        .skip((page - 1) * limit)
        .limit(limit);
    return contacts;
}

const getContactByIdService = async (id, userId) => {
    const contact = await Contact.findOne({ _id: id, userId });    

    if (!contact) {
        throw new WrongParametrsError(`Failure, no contacts with id '${id}' found!`);
    }

    return contact;
}

const createContactService = ({ name, email, phone, favorite }, userId) => {
  return Contact.create({ name, email, phone, favorite, userId })
}

const updateContactService = (id, { name, email, phone, favorite }, userId) => {
    return Contact.findByIdAndUpdate(
        { _id: id, userId },
        { $set: { name, email, phone, favorite } },
        { new: true }
    );
}

const removeContactService = (id, userId) => {
    return Contact.findByIdAndRemove({ _id: id, userId });
}

const changeFavoriteStatusService = (id, favorite, userId) => {
    return Contact.findByIdAndUpdate(
        { _id: id, userId },
        { favorite },
        { new: true }
    );  
}

module.exports = {
  getAllContactsService,
  getContactByIdService,
  createContactService,
  updateContactService,
  removeContactService,
  changeFavoriteStatusService
}

