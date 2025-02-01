const express = require('express');
const { createUser, getUsers, getUser, getUserByEmail, updateUser, updateProfile, changePassword, deleteUser, resetPassword, validateCodeOTP, updatePassword } = require('../controllers/userController');
const router = express.Router();

const { verifyToken } = require('../middlewares/authMiddleware');
const { tenantMiddleware } = require('../middlewares/tenantMiddleware');

router.get('/', [verifyToken, tenantMiddleware], getUsers)
router.get('/:_id', [verifyToken, tenantMiddleware], getUser);
router.post('/', [verifyToken, tenantMiddleware], createUser);
router.put('/:_id', [verifyToken, tenantMiddleware], updateUser);
router.put('/profile/:_id', [verifyToken, tenantMiddleware], updateProfile);
router.put('/change-password/:_id', [verifyToken, tenantMiddleware], changePassword);
router.get('/email/:email', getUserByEmail);
router.post('/reset-password', resetPassword);
router.post('/validateCodeOTP', validateCodeOTP);
router.post('/setNewPassword', updatePassword);
router.delete('/:_id', [verifyToken, tenantMiddleware], deleteUser);

module.exports = router;
