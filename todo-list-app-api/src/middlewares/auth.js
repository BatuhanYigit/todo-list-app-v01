const jwt = require("jsonwebtoken")
const APIError = require("../utils/errors")
const user = require("../models/user.model")



const createToken = async (userInfo, res) => {
    const payload = {
        sub: userInfo._id,
        name: userInfo.name
    }

    const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        algorithm: "HS512",
        expiresIn: process.env.JWT_EXPIRES_IN
    })

    return res.status(201).json({
        success: true,
        token: token,
        message: "Success"
    })

}

const tokenCheck = async (req, res, next) => {
    console.log("Test")
    const headerToken = req.headers.authorization && req.headers.authorization.startsWith("Bearer ")

    if (!headerToken)
        return res.status(401).json({
            success: false,
            message: "Unauthorized: Invalid Token"
        });

    const token = req.headers.authorization.split(" ")[1]

    await jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
        if (err) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Invalid Token"
            });
        }

        const userInfo = await user.findById(decoded.sub).select("_id name lastname email")

        console.log(userInfo)

        if (!userInfo) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Invalid Token"
            });
        }


        req.user = userInfo
        next();

    })


}

module.exports = {
    createToken,
    tokenCheck
}