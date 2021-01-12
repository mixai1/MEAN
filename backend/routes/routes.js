const { Router } = require('express');
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult} = require('express-validator');
const User = require('../models/user');


const router = Router();

///for test
//api/ 
router.get('/', (req, res) => {
    res.json("Hello!");
})

// api/register
router.post(
    '/register',
    [
        check('email').isEmail(),
        check('password').isLength({ min: 5 })
    ],
    async (req, res) => {
        try {
            const errs = validationResult(req);
            if (!errs.isEmpty()) {
                return res.status(400).json({ massage: "Error validation registr", errors: errs.array() })
            }
            const { email, password } = req.body;
            const condit = await User.findOne(email);
            if (condit) {
                return res.status(400).json({ massage: "A user with this email address already exists" })
            }
            const hashPassword = await bcrypt.hash(password, "salt");
            const user = new User({ email: email, password: hashPassword });
            user.save();
            res.status(201);
        } catch (e) {
            res.statusCode(500);
        }
    });

//api/login
router.post('/login',
    [
        check('email').isEmail(),
        check('password').isLength({ min: 5 }).exists()
    ],
    async (req, res) => {
        console.log('res.body', res.body)
        try {
            const errs = validationResult(req);
            if (!errs.isEmpty()) {
                return res.status(400).json({ massage: "Error validation login", errors: errs.array() })
            }
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return req.status(400).json({ massage: "User not faund" });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return req.status(400).json({ massage: "Error validation" });
            }
            const token = jwt.sign(
                { userId: user.id, userName: user.email },
                config.get('secretKey'),
                { expiresIn: '1h' });
            req.json({ token: token, userId: user.id });
        } catch (e) {
            res.statusCode(500);
        }
    });

module.exports = router;