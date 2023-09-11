const express = require('express')
const { engine } = require('express-handlebars')
const routes = require('./routes')
const app = express()
const port = 3000

app.engine('handlebars', engine({ extname: '.hbs'}))
app.set('view engine', 'handlebars')
app.use(routes)


app.get('/', (req, res) => {
  res.send(`This is my first Express Web Site!`)
})

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})