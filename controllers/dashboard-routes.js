const router = require("express").Router()
const sequelize = require('../config/connection')

// render dashboard
router.get("/", (req, res) => {
    res.render("dashboard", {
        loggedIn: true
    })
})

module.exports = router