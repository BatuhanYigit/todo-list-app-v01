const user = require("../models/user.model");
const bcrypt = require("bcrypt");
const APIError = require("../utils/errors");
const Response = require("../utils/response");
const { createToken } = require("../middlewares/auth");
const { response } = require("express");


const login = async (req, res) => {

    console.log("Login geldi")
    const { email, password } = req.body

    const userInfo = await user.findOne({ email: email }) //db email: req.body.email

    console.log(userInfo);

    if (!userInfo)
        throw new APIError("Email or password Invalid ! ", 401)

    const comparePassword = await bcrypt.compare(password, userInfo.password)//Password, Hashed db password

    console.log(comparePassword)


    if (!comparePassword)
        throw new APIError("Email or password Invalid !", 401)

    createToken(userInfo, res)

}


const register = async (req, res) => {
    const { email } = req.body

    const userCheck = await user.findOne({ email })

    if (userCheck) {
        throw new APIError("Email already use! ", 401)

    }

    req.body.password = await bcrypt.hash(req.body.password, 10)

    console.log("hashed password : ", req.body.password);

    const userSave = new user(req.body)

    await userSave.save()
        .then((data) => {

            return new Response(data, "Account Created").created(res)
        })
        .catch((err) => {
            throw new APIError("Account not created!", 400)
        })

}

const userAuth = async (req, res) => {
    return new Response(req.user).success(res)
}

module.exports = {
    login,
    register,
    userAuth
}
