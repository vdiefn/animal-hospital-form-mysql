const express = require('express')
const handlebars = require('express-handlebars')
const flash = require('connect-flash')
const session = require('express-session')
const routes = require('./routes')
const passport = require('./config/passport')
const handlebarsHelpers = require('./helpers/handlebars-helpers')
const { getUser } = require('./helpers/auth-helpers')
const app = express()
const port = 3000
const SESSION_SECRET = 'secret'

app.set('view engine', 'hbs')
app.engine('hbs', handlebars.engine({
  defaultLayout: 'main', 
  extname: 'hbs',
  helpers: handlebarsHelpers
}))

app.use(express.urlencoded({ extended: true }))
app.use(session({ secret: SESSION_SECRET, resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success_messages')
  res.locals.error_messages = req.flash('error_messages')
  res.locals.user = req.user
  next()
})
app.use(routes)



app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})