const crypto = require('crypto')

const User = require('../models/User')
const ErrorResponse = require('../utils/errorResponse');

const sendEmail = require('../utils/sendEmail')

exports.register = async (req, res, next) => {
    const {
        email,
        password,
        confirmPassword
    } = req.body;

    if (!email || !password || !confirmPassword) {
        return res.status(400).json({
            msg: "Not all field have been entered."
        })
    }
    if (password.length < 5)
        return res.status(400).json({
            msg: "The password meets to be at least 6 character long"
        })

    if (password !== confirmPassword) {
        return res.status(400).json({
            msg: "Enter the same password twice for verification"
        })

    }
    try {
        const user = await User.create({
            email,
            password
        });
        sendToken(user, 201, res)
    } catch (error) {
        next(error)

    }
}

exports.login = async (req, res, next) => {
    const {
        email,
        password
    } = req.body;
    if (!email || !password) {
        return next(new ErrorResponse("Please provide an email and password", 400));
    }

    try {
        const user = await User.findOne({
            email
        }).select("+password");

        if (!user) {
            return next(new ErrorResponse("Invalid Credentials", 401));
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return next(new ErrorResponse("Invalid Credentials", 401));
        }

        sendToken(user, 200, res)

    } catch (error) {
        res.status(500).json({
            success: false,
            err: error.message
        });
    }

}

exports.forgotPassword = async (req, res, next) => {
    const {
        email
    } = req.body;

    try {
        const user = await User.findOne({
            email
        });
        if (!user) {
            return next(new ErrorResponse("Email couldn't be sent", 404));
        }

        const resetToken = user.getResetPasswordToken();

        await user.save();

        const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

        const message = `
        <h1>You have requested a password reset</h1>
        <p>Please go to this link  to reset the password</p>
        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
        `

        try {
            await sendEmail({
                to: user.email,
                subject: "Password Reset Request",
                text: message
            });

            res.status(200).json({
                success: true,
                data: "Email Sent"
            })

        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save();
            return next(new ErrorResponse("Email couldn't be sent", 500))
        }
    } catch (error) {
        next(error);
    }

}

exports.resetPassword = async (req, res, next) => {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");


    // resetPasswordToken === resetPasswordToken  can be write as resetPasswordToken.
    try {
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: {
                $gt: Date.now()
            }
        })

        if (!user) {
            return next(new ErrorResponse("Invalid Reset Token", 400))
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();

        res.status(201).json({
            success: true,
            data: "Password Reset Success"
        })
    } catch (error) {
        next(error)
    }
}


const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken();
    res.status(statusCode).json({
        success: true,
        token
    })
}