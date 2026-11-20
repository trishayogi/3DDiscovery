const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const User = require('../models/user')
const { sendPasswordResetEmail } = require('../config/mailer')

const PASSWORD_RESET_MESSAGE = 'If an account exists for that email, a password reset link has been sent.'


// Register API
router.post("/register", async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email, and password are required"
            })
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User is already registered"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await User.create({
            name,
            email,
            phone,
            password: hashedPassword
        });
        res.status(201).json({
            success: true,
            message: "Registration successful",
            user: { id: user._id, name: user.name, email: user.email }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

// Login API
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            })
        }
        const isMatch = await bcrypt.compare(
            password,
            user.password
        )
        //compare pasword
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            })
        }
        //genrate jwt token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({
            success: true,
            message: "login successfully",
            token
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

// Request a time-limited password reset link.
router.post("/forgot-password", async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            })
        }

        const user = await User.findOne({ email: email.trim() });
        if (!user) {
            return res.json({ success: true, message: PASSWORD_RESET_MESSAGE })
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        user.passwordResetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');
        user.passwordResetExpires = new Date(Date.now() + 15 * 60 * 1000);
        await user.save();

        try {
            await sendPasswordResetEmail(user.email, resetToken);
        } catch (emailError) {
            user.passwordResetTokenHash = undefined;
            user.passwordResetExpires = undefined;
            await user.save();
            console.error('Password reset email failed:', emailError);
            return res.status(500).json({
                success: false,
                message: "Could not send the reset email. Please try again later."
            })
        }

        return res.json({ success: true, message: PASSWORD_RESET_MESSAGE })
    } catch (error) {
        console.error('Password reset request failed:', error);
        return res.status(500).json({
            success: false,
            message: "Could not process the password reset request"
        })
    }
})

router.post("/reset-password", async (req, res) => {
    try {
        const { token, password } = req.body;
        if (!token || !password) {
            return res.status(400).json({
                success: false,
                message: "Reset token and new password are required"
            })
        }
        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters"
            })
        }

        const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
        const user = await User.findOne({
            passwordResetTokenHash: tokenHash,
            passwordResetExpires: { $gt: new Date() }
        });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Reset link is invalid or expired"
            })
        }

        user.password = await bcrypt.hash(password, 12);
        user.passwordResetTokenHash = undefined;
        user.passwordResetExpires = undefined;
        await user.save();

        return res.json({ success: true, message: "Password updated successfully" })
    } catch (error) {
        console.error('Password reset failed:', error);
        return res.status(500).json({
            success: false,
            message: "Could not update the password"
        })
    }
})


module.exports = router;