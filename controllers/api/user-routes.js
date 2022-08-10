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

// create a user
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

// login
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(userData => {
            if(!userData) {
                res.status(400).json({ message: 'no user with this id found' })
                return
            }

            const validPassword = userData.checkPassword(req.body.password)

            if(!validPassword) {
                res.status(400).json({ message: 'wrong password' })
                return
            }

            req.session.save(() => {
                req.session.user_id = userData.id
                req.session.username = userData.username
                req.session.loggedIn = true

                res.json({ user: userData, message: 'you are now logged in' })
            })
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