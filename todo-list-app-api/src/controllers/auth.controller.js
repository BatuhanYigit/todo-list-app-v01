const user = require("../models/user.model");
const bcrypt = require("bcryptjs");
const APIError = require("../utils/errors");
const Response = require("../utils/response");
const { createToken } = require("../middlewares/auth");
const { response } = require("express");


const login = async (req, res) => {


    const { email, password } = req.body

    const userInfo = await user.findOne({ email: email }) //db email: req.body.email



    if (!userInfo)
        return res.status(401).json({ message: "Email or password Invalid !" });

    const comparePassword = await bcrypt.compare(password, userInfo.password)//Password, Hashed db password





    if (!comparePassword)
        return res.status(401).json({ message: "Email or password Invalid !" });

    createToken(userInfo, res)

}


const register = async (req, res) => {
    const { email } = req.body

    const userCheck = await user.findOne({ email })

    if (userCheck) {
        return res.status(401).json({ message: "Email already use!" });

    }

    req.body.password = await bcrypt.hash(req.body.password, 10)


    const userSave = new user(req.body)

    await userSave.save()
        .then((data) => {

            return new Response(data, "Account Created").created(res)
        })
        .catch((err) => {
            return res.status(400).json({ message: "Account not created!" });

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
