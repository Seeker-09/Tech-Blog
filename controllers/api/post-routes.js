const router = require("express").Router()
const sequelize = require("../../config/connection")
const { Post } = require('../../models')

// get all posts
router.get("/", (req, res) => {
    Post.findAll()
        .then((postData) => {
            res.json(postData)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
})

// get post by id
router.get("/:id", (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(postData => {
            if(!postData) {
                res.status(404).json({ message: "no post with that id found" })
                return
            }
            res.json(postData)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

module.exports = router