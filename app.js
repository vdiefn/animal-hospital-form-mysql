const express = require('express')
const handlebars = require('express-handlebars')
const flash = require('connect-flash')
const session = require('express-session')
const routes = require('./routes')
const app = express()
const port = 3000
const SESSION_SECRET = 'secret'

app.set('view engine', 'hbs')
app.engine('hbs', handlebars.engine({
  defaultLayout: 'main', 
  extname: 'hbs'
}))

app.use(express.urlencoded({ extended: true }))
app.use(session({ secret: SESSION_SECRET, resave: false, saveUninitialized: false }))
app.use(flash())
app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success_messages')
  res.locals.error_messages = req.flash('error_messages')
  next()
})
app.use(routes)



app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})