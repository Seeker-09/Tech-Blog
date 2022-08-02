const router = require("express").Router()
const sequelize = require("../../config/connection")
const { Post } = require('../../models')

// get all posts
router.get("/", (req, res) => {
    Post.findAll()
        .then((dbPostData) => {
            res.json(dbPostData)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
})

module.exports = router