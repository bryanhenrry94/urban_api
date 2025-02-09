const User = require('../models/User');
const bcrypt = require('bcryptjs');
const sendEmail = require('../utils/email');

const createUser = async (req, res) => {
    try {
        const { body, tenant } = req;

        // create user
        body.tenant = tenant;
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
        const { tenant } = req;

        // const users = await User.find({ tenant }).populate({ path: 'units', as: 'Units' });
        const users = await User.find({ tenant });
        res.status(200).json({ status: 'ok', message: 'Users found successfully', data: users });
    } catch (err) {
        res.status(400).json({ status: 'error', message: `Error find user: ${err.message}`, data: null });
    }
};

const getUser = async (req, res) => {
    try {
        const { _id } = req.params;
        const { tenant } = req;

        const user = await User.findById({ _id, tenant });
        res.status(201).json({ status: 'ok', message: 'User find successfully', data: user });
    } catch (err) {
        res.status(400).json({ status: 'error', message: `Error find user: ${err.message}`, data: null });
    }
};

const updateUser = async (req, res) => {
    try {
        const { _id } = req.params;
        const { body, tenant } = req;

        const user = await User.findByIdAndUpdate({ _id, tenant }, body, { new: true });
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
        const { tenant } = req;

        const user = await User.findById({ _id, tenant });

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
        const { tenant } = req;

        const user = await User.findById({ _id, tenant });

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
        const { tenant } = req;

        await User.findByIdAndDelete({ _id, tenant });

        res.status(200).json({ status: 'ok', message: 'User deleted successfully', data: null });
    } catch (err) {
        res.status(400).json({ status: 'error', message: `Error deleting user: ${err.message}`, data: null });
    }
};

const forgotPassword = async (req, res) => {
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
        const generateRandomPassword = (length) => {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*(),.?":{}|<>';
            let password = '';
            for (let i = 0; i < length; i++) {
                password += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return password;
        };

        const password = generateRandomPassword(12);

        user.password = password;
        await user.save();

        await sendEmail(
            user.email,
            'Restablecimiento de contraseña',
            `Tu contraseña temporal es: ${password}`
        );

        res.status(200).json({ status: 'ok', message: 'Correo de reseteo de contraseña con éxito!', data: null });
    }
    catch (error) {
        res.status(400).json({ status: 'error', message: error.message, data: null });
    }
}

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
        const codeOTP = Math.floor(100000 + Math.random() * 900000).toString();

        user.codeOTP = codeOTP;
        await user.save();

        await sendEmail(
            user.email,
            'Restablecimiento de contraseña',
            `Tu código para restablecer la contraseña es: ${codeOTP}`
        );

        res.status(200).json({ status: 'ok', message: 'Codigo OTP generado con éxito!', data: null });
    }
    catch (error) {
        res.status(400).json({ status: 'error', message: error.message, data: null });
    }
}

const validateCodeOTP = async (req, res) => {
    try {
        const { email, codeOTP } = req.body;

        if (!email) {
            throw new Error('Email incorrecto');
        }

        if (!codeOTP) {
            throw new Error('Código OTP incorrecto');
        }

        // find user by email
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Email incorrecto');
        }

        if (user.codeOTP != codeOTP) {
            throw new Error('Codigo OTP invalido');
        }

        return res.status(200).json({ status: 'ok', message: 'Codigo OTP validado con éxito!', data: true });
    }
    catch (error) {
        return res.status(400).json({ status: 'error', message: `Error: ${error.message}`, data: false });
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

const updatePassword = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            throw new Error("Email incorrecto");
        }

        // updating password
        user.password = password;
        await user.save();

        res.status(201).json({ status: 'ok', message: 'Password change successfully', data: true });
    }
    catch (err) {
        res.status(400).json({ status: 'error', message: `Error updating password: ${err.message}`, data: null });
    }
}

module.exports = { createUser, getUsers, getUser, getUserByEmail, updateUser, updateProfile, changePassword, deleteUser, forgotPassword, resetPassword, validateCodeOTP, updatePassword };