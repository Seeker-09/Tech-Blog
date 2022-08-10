const router = require("express").Router()
const sequelize = require('../config/connection')
const { Post } = require('../models')

// load homepage with posts
router.get('/', (req, res) => {
    Post.findAll()
        .then((dbPostData) => {
            const posts = dbPostData.map((post) => post.get({ plain: true }))

            res.render("homepage", {
                posts,
                loggedIn: req.session.loggedIn
            })
        })
        .catch((err => {
            console.log(err)
            res.status(500).json(err)
        }))
})

// load a single post
router.get('/post/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(postData => {
            if(!postData) {
                res.status(404).json({ message: "no post with this id found" })
                return
            }

            const post = postData.get({ plain: true })

            res.render('single-post', {
                post
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

// get login page
router.get("/login", (req, res) => {
    res.render("login")
})

// render signup page
router.get("/signup", (req, res) => {
    res.render('signup')
})

module.exports = router