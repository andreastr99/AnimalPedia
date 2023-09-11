const jwt = require('jsonwebtoken');

function checkAuth(req, res, next) {
    try {
        // Check if the Authorization header is present
        if (!req.headers.authorization) {
            return res.status(401).json({ "message": "Authorization header missing" });
        }

        // Check if the Authorization header is in the correct format (Bearer token)
        if (!req.headers.authorization.startsWith('Bearer ')) {
            return res.status(401).json({ "message": "Invalid Authorization header format" });
        }

        const accessToken = req.headers.authorization.split(" ")[1];

        jwt.verify(accessToken, process.env.SECRET_KEY, (error, user) => {
            if (error) {
                return res.status(401).json({ "message": "Invalid token" });
            }
            // Token is valid, attach the decoded user information to req.user
            req.user = user;
            next();
        });

    } catch (e) {
        return res.status(500).json({ "message": "Internal server error" });
    }
}

module.exports = {
    checkAuth: checkAuth,
}