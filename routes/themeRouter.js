const express = require('express');
const router = express.Router();
const theme = require('../controller/theme');

router.use(express.urlencoded({ extended: false }));

router.post('/', (req, res) => {
    let name = req.body.name;
    if (name.length > 1024){
        res.json({
            error: "Name length cannot be greater than 1024"
        });
    }
    theme.addByName(req, res, name);
});

router.get('/:id', (req, res) => {
    theme.get(req, res, req.params.id);
});

router.post('/:id/yes', (req, res) => {
    theme.incrementYesVotes(req, res, req.body.id);
});

router.post('/:id/no', (req, res) => {
    theme.incrementNoVotes(req, res, req.body.id);
});

module.exports = router;