const path = require('path')
const express = require("express");
const session = require("express-session")
const exphbs = require("express-handlebars")

const app = express();
const PORT = process.env.PORT || 3001

// get sequelize connection
const sequelize = require("./config/connection")

// connect session to sequelize
const SequelizeStore = require("connect-session-sequelize")(session.Store)

// create session variable
const sess = {
    secret: 'secret secret',
    cookie: {},
    saveUnintialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
}

const hbs = exphbs.create()

// set view engine
app.engine("handlebars", hbs.engine)
app.set('view engine', 'handlebars')

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(session(sess))

// use controllers
app.use(require('./controllers'))

// sync server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log("Listening"))
})