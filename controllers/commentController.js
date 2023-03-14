const express = require('express');
const router = express.Router();
const { User, Comment } = require('../models');

router.get("/", (req, res) => {
    Comment.findAll({ include: [User] }).then(commentData => {
        res.json(commentData)
    }).catch(err => {
        console.log(err);
        res.status(500).json({ msg: "something went wrong", err })
    })
})

router.post("/", (req, res) => {
    // console.log(req.body);
    if (!req.session.userId) {
        return res.status(403).json({ msg: "please login" });
    }
    Comment.create({
        text: req.body.text,
        PostId: req.body.PostId,
        UserId: req.session.userId
    }).then(commentData => {
        res.json(commentData)
    }).catch(err => {
        console.log(err)
        res.status(500).json({ msg: "something went wrong" })
    })
})

router.delete("/:id", (req, res) => {
    if (!req.session.userId) {
        return res.status(403).json({ msg: "login first" })
    }
    Comment.destroy({
        where: {
            id: req.params.id
        }
    }).then(commentData => {
        res.json(commentData)
    }).catch(err => {
        console.log(err);
        res.status(500).json({ msg: "something went wrong", err })
    })
})


module.exports = router;