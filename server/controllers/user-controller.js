const User = require('../models/user-model');
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const key = process.env.A_SECRET_KEY

class UserController {

    /**
     * This function creates a new user on the database when the user provided dataset is valid
     * @param {*} req 
     * @param {*} res 
     * @returns void or error, creates a new user on the database
     */
    register = async (req, res) => {
        if (req.body.email) {
            req.body.email = req.body.email.toLowerCase()
        } 
        //Checking for duplicate email
        const dupe = await User.find({email: req.body.email})
        if (dupe.length !== 0) {
            return res.json({errors: {email: {message: "Email is already in use!"}}})
        }

        User.create(req.body)
            .then(user => {
                const userToken = jwt.sign({id: user._id}, key);
                res.cookie("usertoken", userToken, key, {httpOnly: true})
                        .json({user: user})
            })
            .catch(error => res.json(error))
    }

    /**
     * This function logs in a user to the application when the provided user dataset is present in the database
     * @param {*} req 
     * @param {*} res 
     * @returns void or error, logs in the user onto the database using jwt and cookies
     */
    login = async (req, res) => {
        const user = await User.findOne({email: req.body.email.toLowerCase()});
        if (!user) {
            return res.sendStatus(400);
        }

        const correctPassword = await bcrypt.compare(req.body.password, user.password);
        if (!correctPassword) {
            return res.sendStatus(400);
        }

        const userToken = jwt.sign({id: user._id}, key)

        res.cookie("usertoken", userToken, key, {httpOnly: true})
            .json({user: user})
    }

    /**
     * This function logs out a user from the application
     * @param {*} req 
     * @param {*} res 
     * @returns void, logs out the user from the application
     */
    logout = (req, res) => {
        res.clearCookie('usertoken');
        res.sendStatus(200);
    }

    /**
     * This function gets the current user from the application provided the user is logged in via jwt and cookies
     * @param {*} req 
     * @param {*} res 
     * @returns void or error, returns a usable user dataset for the application to use
     */
    getCurrent = (req, res) => {
        if (!req.cookies.usertoken) {
            return res.sendStatus(400);
        }
        const data = jwt.decode(req.cookies.usertoken, {complete: true})
        User.findOne({_id: data.payload.id})
            .then(user => {res.json(user)})
            .catch(error => {res.json(error)})
    }

    /**
     * This function gets all users from the application (for testing purposes)
     * @param {*} req 
     * @param {*} res 
     * @returns void or error, returns a usable dataset for the application
     */
    getAll = (req, res) => {
        User.find()
            .then(users => res.json(users))
            .catch(error => res.json(error))
    }
}

module.exports = new UserController();