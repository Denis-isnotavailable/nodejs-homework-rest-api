const express = require('express');
const { authMiddleware } = require('../../middelwares/authMiddleware');

const {
  postDataValidation,
  putDataValidation } = require('../../middelwares/validationMiddlewares');

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  changeFavoriteStatus} = require('../../models/contacts');



const router = express.Router();

router.use(authMiddleware);

router.get('/', listContacts);
router.get('/:contactId', getContactById);
router.post('/', postDataValidation, addContact);
router.delete('/:contactId', removeContact);
router.put('/:contactId', putDataValidation, updateContact);
router.patch('/:contactId/favorite', changeFavoriteStatus);

module.exports = router;
