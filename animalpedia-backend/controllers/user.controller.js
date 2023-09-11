const UserModel = require('../models/userModel');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');


//next: so we can pass to the next function 
function loginRequired(req, res, next) {
    //if that's true go ahead to the next function
    //which will be the function tot get the data
    console.log(req.user);
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
        .then(async userExists => {
            if (!userExists) {
                return res.status(401).json({
                    message: "Authentication failed"
                })
            } else if (userExists) {
                await userExists.comparePassword(req.body.password, userExists.hashpassword)
                    .then((passwordResult) => {
                        if (!passwordResult) {
                            return res.status(401).json({
                                message: "Authentication failed"
                            })
                        } else {
                            //when everything matches we return a token to make transactions with the API            

                            const refreshToken = jwt.sign({ email: userExists.email, username: userExists.username, _id: userExists.id }, process.env.COOKIE_SECRET_KEY, { expiresIn: '1d' })
                            res.cookie('refreshToken', refreshToken, {
                                httpOnly: true,
                                secure: process.env.NODE_ENV === 'production',
                                sameSite: 'strict',
                            });
                            return res.status(200).json({
                                accessToken: jwt.sign({ email: userExists.email, username: userExists.username, _id: userExists.id }, process.env.SECRET_KEY, { expiresIn: '1h' }),
                                refreshToken: refreshToken
                            })
                        }
                    })
            }
        })
        .catch(error => {
            return res.status(500).json({
                message: error
            })
        })
}

function logout(req, res) {
    res.clearCookie('refreshToken');
    return res.status(200).json({ message: 'Logout successful' });
};

function verifyToken(req, res) {
    const refreshToken = req.cookies.refreshToken
    jwt.verify(refreshToken, process.env.COOKIE_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(401).json({ "message": "Invalid token" });
        }

        return res.status(200).json({ username: user.username });
        // if (user) {
        // next();
        // }
    });
}

function refreshToken(req, res) {
    const refreshToken = req.cookies.refreshToken;
    try {
        let decodedRefreshToken
        jwt.verify(refreshToken, process.env.COOKIE_SECRET_KEY, (err, user) => {
            if (err) {
                res.clearCookie('refreshToken');
            } else {
                decodedRefreshToken = user
            }
        });
        // Generate a new access token
        const user = {
            _id: decodedRefreshToken._id,
            email: decodedRefreshToken.email,
            username: decodedRefreshToken.username,
        };
        // const accessToken = jwt.sign({ email: userExists.email, username: userExists.username, _id: userExists.id }, process.env.SECRET_KEY, { expiresIn: '1h' })
        const accessToken = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: '1h' })
        // Send the new access token to the client
        return res.status(200).json({ accessToken: accessToken });
    } catch (error) {
        // Handle token validation errors
        return res.status(401).json({ message: 'Invalid refresh token' });
    }
}

module.exports = {
    loginRequired: loginRequired,
    register: register,
    login: login,
    logout: logout,
    verifyToken: verifyToken,
    refreshToken: refreshToken
}