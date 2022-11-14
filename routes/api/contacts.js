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

router.get('/', authMiddleware, listContacts);
router.get('/:contactId', authMiddleware, getContactById);
router.post('/', authMiddleware, postDataValidation, addContact);
router.delete('/:contactId', authMiddleware, removeContact);
router.put('/:contactId', authMiddleware, putDataValidation, updateContact);
router.patch('/:contactId/favorite', authMiddleware, changeFavoriteStatus);

module.exports = router;
