const UserModel = require('../models/userModel');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');


//next: so we can pass to the next function 
function loginRequired(req, res, next) {
    //if that's true go ahead to the next function
    //which will be the function tot get the data
    if (req.user) {
        next();
    } else {
        return res.status(401).json({ message: "Unauthorized" })
    }
}

//request sends the password but in our db it's called hashPassword
async function register(req, res) {

    const newUser = new UserModel(req.body);

    //10 is the number that hashSync requires to encrypt
    newUser.hashpassword = await bcryptjs.hash(req.body.password, 10);
    newUser.save().then(response => {
        response.hashpassword = undefined;
        return res.json(response);
    })
        .catch(error => {
            console.error(error)
            return res.status(400).send({
                message: error
            })
        })
}

function login(req, res) {
    UserModel.findOne({ email: req.body.email, })
        .then(response => {
            // res.status(200).json(response)
            if (!response) {
                res.status(401).json({
                    message: "Authentication faileddd"
                })
            } else if (response) {
                if (!response.comparePassword(req.body.password, response.hashpassword)) {
                    return res.status(401).json({
                        message: "Authentication failed"
                    })
                } else {
                    //when everything matches we return a token to make transactions with the API            
                    return res.json({
                        token: jwt.sign({ email: response.email, username: response.username, _id: response.id }, process.env.SECRET_KEY, { expiresIn: '15m' })
                    })
                }
            }
        })
        .catch(error => {
            res.status(500).json({
                message: error
            })
        })
}

module.exports = {
    loginRequired: loginRequired,
    register: register,
    login: login,
}