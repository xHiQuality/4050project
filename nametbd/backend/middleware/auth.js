const jwt = require("jsonwebtoken");

exports.auth = async (req, res, next) => {
    try {
        const token = req.header("x-auth-token");

        if (!token) {
            return res.status(400).send({message: "No auth token, access denied"});
        }
        const verified = jwt.verify(token, "passwordKey");
        if (!verified) {
            return res.status.send({message: "Token verification failed, authorization denied"});
        }
        req.user = verified.id;
        next();
    } catch {
        res.status(400).send({message: err.message || "Error in auth.js"});
    }
};

