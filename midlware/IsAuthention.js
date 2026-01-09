const jwt = require("jsonwebtoken")
const User = require("../model/UserModel");
const { promisify } = require("util");



const isAuthention = async (req, res, next) => {

    console.log("isAuthention middleware called");


    const token = await req.headers.authorization;

    if (!token) {
        return res.status(401).json({
            message: "Authention token is missing"
        })
    }
    // token yao vane k agene 
    // token verify garne
    const decoded = await promisify(jwt.verify)(token, "hello@33rwcfd,.dhh");

    if (!decoded) {
        return res.status(401).json({
            message: "token is invalid"
        })
    }
    else {
        console.log("token is verified");
    }

    // check whether user exist or not
    const doesUserExist = await User.findOne({ _id: decoded.id })
    // console.log(doesUserExist);

    if (!doesUserExist) {
        return res.status(401).json({
            massage: "user does not exist"
        })
    }


    req.user = doesUserExist;

    next();
}

module.exports = isAuthention;