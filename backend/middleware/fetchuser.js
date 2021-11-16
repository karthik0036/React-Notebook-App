const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const fetchuser = (req, res, next) => {
    const token = req.header("auth-token")
    if (!token) {
        res.status(401).send({ error: "please authenticate with valid token" })
    }

    try {
        const data = jwt.verify(token, "shhhhh")
        req.user = data.user
        next();
    }
    catch (error) {
        res.status(401).send({ error: "please authenticate with valid token" })

    }
}

module.exports = fetchuser