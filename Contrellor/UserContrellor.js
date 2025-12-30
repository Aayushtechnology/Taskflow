const User = require("../model/UserModel")
const bcrypt = require("bcryptjs")
// const sendEmail = require("../service/sendEmail")
const jwt = require("jsonwebtoken")

exports.registerUser = async (req, res) => {

    const { username, email, userNumber, password } = req.body

    if (!username || !email || !userNumber || !password) {
        return res.status(400).json({
            message: "please provide username, email, userNumber, password"
        })
    }


    try {
        const userFound = await User.find({ userEmail: email })

        if (userFound.length > 0) {
            return res.status(400).json({
                message: "user with that email already registered",
                data: []
            })
        }

        const userData = await User.create({
            userName: username,
            userEmail: email,
            userNumber: userNumber,
            userPassword: bcrypt.hashSync(password, 10)

        })

        return res.status(201).json({
            message: "registration successully",
            data: userData
        })
    } catch (err) {
        // If mongoose validation error, return 400 with details
        if (err.name === 'ValidationError') {
            // collect messages
            const messages = Object.values(err.errors).map(e => e.message)
            return res.status(400).json({ message: messages.join('; ') })
        }
        // otherwise return generic 500 with message
        console.error('registerUser error:', err)
        return res.status(500).json({ message: 'Internal server error' })
    }

}


exports.loginUser = async (req, res) => {

    const { email, password } = req.body


    if (!email || !password) {
        return res.status(400).json({
            message: "email, password most be provide"
        })
    }

    const userFound = await User.find({ userEmail: email })
    if (userFound.length == 0) {
        return res.status(400).json({
            message: "this email is not register"
        })
    }

    const isMatched = bcrypt.compareSync(password, userFound[0].userPassword)


    if (isMatched) {

        const token = jwt.sign({ id: userFound[0]._id }, "hello@33rwcfd,.dhh", {
            expiresIn: "9475858s"
        })

        return res.status(200).json({
            message: "user logged in successfully",
            data: userFound,
            token: token
        })

    } else {
        return res.status(400).json({
            message: "Invalid password"
        })
    }

}

//forgot password

exports.forgotPassword = async (req, res) => {

    const { email } = req.body

    if (!email) {
        return res.status(400).json({
            message: "please provide email"
        })
    }

    const userExist = await User.find({ userEmail: email })

    if (userExist.length === 0) {
        return res.status(400).json({
            message: "user email is not register"
        })
    }

    const otp = Math.floor(1000 + Math.random() * 90000);

    userExist[0].otp = otp
    userExist[0].isOtpVerified = false
    await userExist[0].save()


    await sendEmail({
        email: email,
        subject: "verification otp",
        message: "your otp is: " + otp
    })

    return res.status(200).json({
        message: "OTP send successfully",
    })

}

exports.verifyOtp = async (req, res) => {
    const { email, otp } = req.body
    console.log(email, otp)

    if (!email || !otp) {
        return res.status(400).json({
            message: "email and otp must be provide"
        })
    }
    const userExists = await User.find({ userEmail: email }).select("+otp +isOtpVerified")

    if (userExists.length === 0) {
        return res.status(400).json({
            message: "email is not regster"
        })
    }

    if (userExists[0].otp !== otp) {
        return res.status(404).json({
            message: "Inviled Otp"
        })
    } else {

        userExists[0].otp = undefined
        userExists[0].isOtpVerified = true
        await userExists[0].save()

        return res.status(200).json({
            message: "otp is verify"
        })
    }
}

exports.ResetPassword = async (req, res) => {
    const { email, newPassword, confirmPassword } = req.body

    if (!email) {
        return res.status(400).json({
            massage: " please provide email "
        })
    }

    if (!newPassword) {
        return res.status(400).json({
            massage: " please provide newpassword  "
        })
    }
    if (!confirmPassword) {
        return res.status(400).json({
            massage: " please provide confirmpassword  "
        })
    }


    if (newPassword !== confirmPassword) {
        return res.status(400).json({
            massage: " password dose not match "
        })
    }

    const userExist = await User.find({ userEmail: email })
    if (userExist.length == 0) {
        return res.status(404).json({
            massage: " user email is not resisterd "
        })
    }

    if (userExist[0].isOtpVerified === false) {
        return res.status(400).json({
            massage: " otp is not verified "
        })
    }

    userExist[0].userPassword = bcrypt.hashSync(newPassword, 10)

    userExist[0].otp = undefined

    userExist[0].isOtpVerified = true
    await userExist[0].save()


    res.status(200).json({
        massage: "sucessfully "
    })
}