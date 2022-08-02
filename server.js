const path = require('path')
const express = require("express");
const exphbs = require("express-handlebars")

const app = express();
const PORT = process.env.PORT || 3001

// get sequelize connection
const sequelize = require("./config/connection")

const hbs = exphbs.create()

// set view engine
app.engine("handlebars", hbs.engine)
app.set('view engine', 'handlebars')

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

// use controllers
app.use(require('./controllers'))

// sync server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log("Listening"))
})