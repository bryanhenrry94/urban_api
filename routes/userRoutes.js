const express = require('express');
const { createUser, getUsers, getUser, getUserByEmail, updateUser, updateProfile, changePassword, deleteUser, resetPassword } = require('../controllers/userController');
const router = express.Router();

router.post('/', createUser);
router.get('/', getUsers)
router.get('/:_id', getUser);
router.get('/email/:email', getUserByEmail);
router.put('/:_id', updateUser);
router.put('/profile/:_id', updateProfile);
router.put('/change-password/:_id', changePassword);
router.post('/reset-password', resetPassword);
router.delete('/:_id', deleteUser);

module.exports = router;
