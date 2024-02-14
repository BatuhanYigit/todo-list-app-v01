const joi = require("joi")
const APIError = require("../../utils/errors")

class authValidation {
    constructor() { }
    static register = async (req, res, next) => {
        try {

            await joi.object({
                name: joi.string().trim().min(3).max(100).required().messages({
                    "string.base": "Name must be text",
                    "string.empty": "Name cannot be empty",
                    "string.min": "Name minimum 3 characters",
                    "string.max": "Name maximum 100 characters",
                    "string.required": "Name is required"

                }),
                lastname: joi.string().trim().min(3).max(100).required().messages({
                    "string.base": "Lastname must be text",
                    "string.empty": "Lastname cannot be empty",
                    "string.min": "Lastname minimum 3 characters",
                    "string.max": "Lastname maximum 100 characters",
                    "string.required": "Lastname is required"

                }),
                email: joi.string().email().trim().min(3).max(100).required().messages({
                    "string.base": "Email must be text",
                    "string.empty": "Email cannot be empty",
                    "string.min": "Email minimum 3 characters",
                    "string.email": "Please enter a valid email",
                    "string.max": "Email maximum 100 characters",
                    "string.required": "Email is required"

                }),
                password: joi.string().trim().min(6).max(36).required().messages({
                    "string.base": "Password must be text",
                    "string.empty": "Password cannot be empty",
                    "string.min": "Password minimum 6 characters",
                    "string.max": "Password maximum 36 characters",
                    "string.required": "Password is required"

                })
            }).validateAsync(req.body)

        } catch (error) {
            if (error.details && error?.details[0].message)
                throw new APIError(error.details[0].message, 400)
            else throw new APIError("Validation error ! ", 400)
        }
        next()
    }

    static login = async (req, res, next) => {
        try {

            await joi.object({
                email: joi.string().email().trim().min(3).max(100).required().messages({
                    "string.base": "Email must be text",
                    "string.empty": "Email cannot be empty",
                    "string.min": "Email minimum 3 characters",
                    "string.email": "Please enter a valid email",
                    "string.max": "Email maximum 100 characters",
                    "string.required": "Email is required"

                }),
                password: joi.string().trim().min(6).max(36).required().messages({
                    "string.base": "Password must be text",
                    "string.empty": "Password cannot be empty",
                    "string.min": "Password minimum 6 characters",
                    "string.max": "Password maximum 36 characters",
                    "string.required": "Password is required"

                })

            }).validateAsync(req.body)

        } catch (error) {
            if (error.details && error?.details[0].message)
                throw new APIError(error.details[0].message, 400)
            else throw new APIError("Validation error ! ", 400)
        }
        next();

    }
}

module.exports = authValidation