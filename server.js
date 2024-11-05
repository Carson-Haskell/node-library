if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const app = express()

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')

app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))

// DATABASE
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL)

const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', () => {
  console.log('Connected to Mongoose')
})

// ROUTES
const indexRouter = require('./routes/index')
app.use('/', indexRouter)

const authorsRouter = require('./routes/authors')
app.use('/authors', authorsRouter)

// SERVER
app.listen(process.env.PORT || 3000, () =>
  console.log(`Listening on port ${process.env.PORT || 3000}...`)
)
