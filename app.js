const express = require('express')
const handlebars = require('express-handlebars')

const routes = require('./routes')
const app = express()
const port = 3000

app.set('view engine', 'hbs')
app.engine('hbs', handlebars.engine({
  defaultLayout: 'main', 
  extname: 'hbs'
}))



app.use(routes)



app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})