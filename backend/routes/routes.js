const { Router } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');


const router = Router();

router.get('/get', (req, res) => {
    res.json("Hello!");
})

// api/add
router.post('/add', async (req, res) => {
    try {
        const { email, password } = req.body
        const condit = await User.findOne(email);
        if (condit) {
            return res.status(400).json({ massage: "A user with this email address already exists" })
        }
        const hasPassword = await bcrypt.hash(password, "salt");

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