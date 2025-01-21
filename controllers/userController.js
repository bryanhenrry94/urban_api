const User = require('../models/User');
const bcrypt = require('bcryptjs');
const sendEmail = require('../utils/email');

const createUser = async (req, res) => {
    try {
        const { body, tenantId } = req;

        // create user
        body.tenantId = tenantId;
        body.password = Math.random().toString(36).slice(-8);

        const user = new User(body);
        await user.save();

        res.status(201).json({ status: 'ok', message: 'User created successfully', data: user });
    } catch (err) {
        res.status(400).json({ status: 'error', message: `Error creating user: ${err.message}`, data: null });
    }
}

const getUsers = async (req, res) => {
    try {
        const { tenantId } = req;

        const users = await User.find({ tenantId }).populate({ path: 'propertyId', as: 'Property' });
        res.status(200).json({ status: 'ok', message: 'Users found successfully', data: users });
    } catch (err) {
        res.status(400).json({ status: 'error', message: `Error find user: ${err.message}`, data: null });
    }
};

const getUser = async (req, res) => {
    try {
        const { _id } = req.params;
        const { tenantId } = req;

        const user = await User.findById({ _id, tenantId });
        res.status(201).json({ status: 'ok', message: 'User find successfully', data: user });
    } catch (err) {
        res.status(400).json({ status: 'error', message: `Error find user: ${err.message}`, data: null });
    }
};

const updateUser = async (req, res) => {
    try {
        const { _id } = req.params;
        const { body, tenantId } = req;

        const user = await User.findByIdAndUpdate({ _id, tenantId }, body, { new: true });
        await user.save();

        res.status(201).json({ status: 'ok', message: 'Profile update successfully', data: user });
    } catch (err) {
        res.status(400).json({ status: 'error', message: `Error updating user: ${err.message}`, data: null });
    }
}

const updateProfile = async (req, res) => {
    try {
        const { _id } = req.params;
        const { name, email } = req.body;
        const { tenantId } = req;

        const user = await User.findById({ _id, tenantId });

        // updating user
        if (name) user.name = name;
        if (email) user.email = email;

        await user.save();

        res.status(201).json({ status: 'ok', message: 'Profile update successfully', data: user });
    } catch (err) {
        res.status(400).json({ status: 'error', message: `Error updating user: ${err.message}`, data: null });
    }
}

const changePassword = async (req, res) => {
    try {
        const { _id } = req.params;
        const { oldPassword, newPassword } = req.body;
        const { tenantId } = req;

        const user = await User.findById({ _id, tenantId });

        if (user && !(await bcrypt.compare(oldPassword, user.password))) {
            return res.status(400).json({ message: 'La contraseña ingresada es incorrecta' });
        }

        // updating password
        user.password = newPassword;

        await user.save();

        res.status(201).json({ status: 'ok', message: 'Password change successfully', data: user });
    }
    catch (err) {
        res.status(400).json({ status: 'error', message: `Error updating password: ${err.message}`, data: null });
    }
}

const deleteUser = async (req, res) => {
    try {
        const { _id } = req.params;
        const { tenantId } = req;

        await User.findByIdAndDelete({ _id, tenantId });

        res.status(200).json({ status: 'ok', message: 'User deleted successfully', data: null });
    } catch (err) {
        res.status(400).json({ status: 'error', message: `Error deleting user: ${err.message}`, data: null });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            throw new Error('Email incorrecto');
        }

        // find user by email
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Email incorrecto');
        }

        // generate random password
        const password = Math.random().toString(36).slice(-8);

        user.password = password;
        await user.save();

        await sendEmail(
            user.email,
            'Restablecimiento de contraseña',
            `Su nueva contraseña es: ${password}`
        );

        res.status(200).json({ status: 'ok', message: 'Contraseña restablecida con éxito', data: null });
    }
    catch (error) {
        res.status(400).json({ status: 'error', message: `Error restableciendo la contraseña: ${error.message}`, data: null });
    }
}

const getUserByEmail = async (req, res) => {
    try {
        const { email } = req.params;

        const user = await User.findOne({ email });
        res.status(201).json({ status: "ok", message: 'User find successfully', data: user });
    } catch (err) {
        res.status(400).json({ status: 'error', message: `Error find user: ${err.message}`, data: null });
    }
};

module.exports = { createUser, getUsers, getUser, getUserByEmail, updateUser, updateProfile, changePassword, deleteUser, resetPassword };