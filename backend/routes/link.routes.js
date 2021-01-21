const { Router } = require('express');
const { Link } = require('../models/link');
const { shortid } = require('shortid');
const { config } = require('../config');
const { middlAuth } = require('../middleware/auth.middleware');

const router = Router();

// api/link/
router.get('/', middlAuth, async (req, res) => {
    try {
        const links = await Link.find({ owner: req.user.userId });
        res.json(links);
    } catch (error) {
        return res.status(500).json({ message: "Error server, try again" });
    }
});

// api/link/generate
router.post('/generate', middlAuth, async (req, res) => {
    try {
        const baseUrl = config.get('baseUrl');
        const { from } = req.body;
        const code = shortid.generate();
        const existingLink = Link.findOne({ from });
        if (existingLink) {
            return res.json({ link: existingLink });
        }
        const linkTo = baseUrl + '/t/' + code;
        const link = new Link({
            code: code,
            to: linkTo,
            from: from,
            owner: req.user.userId
        });
        await Link.save();
        res.status(201).json({ link });

    } catch (error) {
        return res.status(500).json({ message: "Error server, try again" });
    }
});

// api/link/:id
router.get('/:id', middlAuth, async (req, res) => {
    try {
        const link = await Link.findById(req.params.id);
        res.json(link);
    } catch (error) {
        return res.status(500).json({ message: "Error server, try again" });
    }
});

module.exports = router;