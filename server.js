const express = require('express')

require('dotenv').config()
const PORT = process.env.PORT
const app = express()

app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.send('Welcome to an app about bread')
})

// 404 Page
app.get('*', (req, res) => {
  res.send('404')
})

const breadsController = require('./controllers/breads_controller.js')
app.use('/breads', breadsController)

app.listen(PORT, () => {
  console.log('listening on port', PORT);
})
