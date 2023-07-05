const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.PAYLOAD_SECRET

if (!secret) {
    throw new Error(
      "Missing required environment variables for user authentication"
    );
  };

function generateToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, secret, {expiresIn: '10m'}, function(error, token) {
            if (error) reject(error)
            resolve(token)
        })
    })
};

function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, secret, function(err, user) {
        if (err) return res.status(403).send({
            errno : 100,
            message: "Token expired, please login."
        })
        req.user = user
        next()
    })
};

const tokenFunctions = {
    generateToken,
    verifyToken,
}

module.exports = tokenFunctions