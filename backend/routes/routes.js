const { Router } = require('express');
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult, body } = require('express-validator');
const User = require('../models/user');

const router = Router();

//api/ 
router.get('/get', (req, res) => {
    res.json("Hello!");
}, [])

// api/register
router.post('/register',
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
            const findUser = await User.findOne({ email: email }, { email: 1 });
            if (findUser) {
                return res.status(400).json({ message: "A user with this email address already exists" });
            }
            const hashPassword = await bcrypt.hash(password, 12);
            const user = new User({ email: email, password: hashPassword });
            user.save();
            res.status(201).json({ message: "User add" });
        } catch (e) {
            console.log('e', e);
            res.status(500).json({ message: 'Error Server' });
        }
    }, []);

//api/login
router.post('/login',
    [
        check('email').isEmail(),
        check('password').exists()
    ],
    async (req, res) => {
        try {
            const errs = validationResult(req);
            if (!errs.isEmpty()) {
                return res.status(400).json({ message: "Error validation login", errors: errs.array() })
            }
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: "User not faund" });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Error validation" });
            }
            const token = jwt.sign(
                { userId: user.id, userName: user.email },
                config.get('secretKey'),
                { expiresIn: '1h' });
            return res.status(200).json({ token: token, userId: user.id });
        } catch (e) {
            console.log(e.message);
            res.status(500).json({ message: "Error Server" });
        }
    });

module.exports = router;