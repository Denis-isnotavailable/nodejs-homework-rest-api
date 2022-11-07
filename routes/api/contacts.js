const express = require('express');

const {
  postDataValidation,
  putDataValidation } = require('../../middelwares/validationMiddlewares');

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact } = require('../../models/contacts');


const router = express.Router();

router.get('/', listContacts);
router.get('/:contactId', getContactById);
router.post('/', postDataValidation, addContact);
router.delete('/:contactId', removeContact);
router.put('/:contactId', putDataValidation, updateContact);

module.exports = router;





// GET ALL

// router.get('/', async (req, res, next) => {
//   const contacts = await listContacts();
//   res.json({ contacts, status: "200" });
// })

// GET BY ID

// router.get('/:contactId', async (req, res, next) => {
//   const { contactId } = req.params;
//   const contact = await getContactById(contactId);

//   if (!contact) {
//     res.json({ message: "Not found", status: "404" })
//   }

//   res.json({ contact, status: "200" });
// })

// ADD CONTACT

// router.post('/', postDataValidation, async (req, res, next) => {
//   const { name, email, phone } = req.body;
  
//   if (!name) {
//     return res.json({ message: "missing required name field", status: "400" })
//   }
//   if (!email) {
//     return res.json({ message: "missing required email field", status: "400" })
//   }
//   if (!phone) {
//     return res.json({ message: "missing required phone field", status: "400" })
//   }

//   const contact = await addContact(req.body);

//   res.json({ contact, status: "201" });
// })

// DELETE CONTACT

// router.delete('/:contactId', async (req, res, next) => {
//   res.json(await removeContact(req.params.contactId));
// })

// UPDATE CONTACT

// router.put('/:contactId', putDataValidation, async (req, res, next) => {
//   const { name, email, phone } = req.body;  
  
//   if (!name && !email && !phone) {
//     return res.json({ message: "missing fields", status: "400" });
//   }
  
//   res.json(await updateContact(req.params.contactId, req.body));
// })