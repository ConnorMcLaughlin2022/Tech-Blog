const express = require('express');
const router = express.Router();
const { User, Post } = require('../models');

router.get("/", (req, res) => {
    Post.findAll({ include: [User] }).then(postData => {
        res.json(postData)
    }).catch(err => {
        console.log(err);
        res.status(500).json({ msg: "something went wrong", err })
    })
})
router.get("/:id", (req, res) => {
    Post.findByPk(req.params.id, {
        include: [User]
    }).then((postData) => {
        res.json(postData)
        // console.log(postData)
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ msg: "something went wrong", err })
    })
})

router.post("/", (req, res) => {
    console.log(req.body);
    Post.create({
        title: req.body.title,
        content: req.body.content,
        UserId: req.session.userId
    }).then(postData => {
        res.json(postData)
    }).catch(err => {
        console.log(err)
        res.status(500).json({ msg: "something went wrong" })
    })
})

router.put("/edit-post", (req, res) => {
    if (!req.session.userId) {
        return res.status(403).json({ msg: "login before editing a post" });
    }
    Post.update(
        {
            title: req.body.title,
            content: req.body.content
        },
        {
            where: {
                id: req.body.id
            }
        });
});

router.delete("/:id", (req, res) => {
    if (!req.session.userId) {
        return res.status(403).json({ msg: "login first" })
    }
    Post.destroy({
        where: {
            id: req.params.id
        }
    }).then(postData => {
        res.json(postData)
    }).catch(err => {
        console.log(err);
        res.status(500).json({ msg: "something went wrong", err })
    });
});

module.exports = router;