const { jwt } = require('jsonwebtoken');
const { config } = require('config');

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }
    try {
        const token = req.headers.authorization.split('')[1];
        console.log(token);
        if (!token) {
            return res.status(401).json({ message: "Not authorization" });
        }
        const decoded = jwt.verify(token, config.get('secretKey'));
        console.log(decoded);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Not authorization" });
    }
}