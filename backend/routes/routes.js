const { Router } = require('express');
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');
const User = require('../models/user');


const router = Router();

router.get('/get', (req, res) => {
    res.json("Hello!");
})

// api/register
router.post(
    '/add',
    [
        check('email').isEmail(),
        check('password').isLength({min: 5})
    ],
     async (req, res) => {
    try {

        const errs = validationResult(req);
        if(!errs.isEmpty()){
            return res.status(400).json({massage: "Error validation",errors: errs.array()})
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

router.post('/registr', async (req, res) => {
    try {

    } catch (e) {
        res.statusCode(500);
    }
});

module.exports = router;