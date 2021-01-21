const { Router } = require('express');
const Link = require('../models/link');
const shortid = require('shortid');
const config = require('config');
const middleware = require('../middleware/auth.middleware');

const router = Router();

// api/link/
router.get('/', middleware, async (req, res) => {
    try {
        const links = await Link.find({ owner: req.user.userId });
        res.json(links);
    } catch (error) {
        return res.status(500).json({ message: "Error server, try again" });
    }
});

// api/link/generate
router.post('/generate', middleware, async (req, res) => {
    try {
        const baseUrl = config.get('baseUrl');
        const { from } = req.body;
        const code = shortid.generate();
        const existingLink = await Link.findOne({ from });
        if (existingLink) {
            return res.json({ link: existingLink });
        }
        const to = baseUrl + '/t/' + code;
        const link = new Link({ from, to, code, owner: req.user.userId });
        link.save();
        res.status(201).json({ link });
    } catch (error) {
        res.status(500).json({ message: "Error server, try again" });
    }
});

// api/link/:id
router.get('/:id', middleware, async (req, res) => {
    try {
        const link = await Link.findById(req.params.id);
        res.json(link);
    } catch (error) {
        return res.status(500).json({ message: "Error server, try again" });
    }
});

module.exports = router;