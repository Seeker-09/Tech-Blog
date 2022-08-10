const router = require("express").Router()
const { request } = require("express")
const { User } = require('../../models')

// get all users
router.get('/', (req, res) => {
    User.findAll()
        .then(userData => res.json(userData))
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

router.post('/', (req, res) => {
    /* expects:
        username
        password
    */
    User.create({
        username: req.body.username,
        password: req.body.password
    })
        .then(userData => {
            req.session.save(() => {
                req.session.user_id = userData.id
                req.session.username = userData.username
                req.session.loggedIn = true

                res.json(userData)
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

// logout user by destroying session id
router.post('/logout', (req, res) => {
    if(req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end()
        })
    }
    else {
        res.status(404).end()
    }
})

module.exports = router