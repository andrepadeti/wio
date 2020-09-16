const createError = require('http-errors')
const express = require('express')
const join = require('path').join
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const favicon = require('serve-favicon')
const hbs = require('hbs')
// import hbs, { registerHelper, registerPartials } from 'hbs'

const homeRouter = require('./routes/home')
// import gamesListRouter from './routes/games-list'
const wioRouter = require('./routes/wio')
const usersRouter = require('./routes/users')

var app = express()

// view engine setup
app.set('view engine', 'hbs')
app.set('views', [ 
  join(__dirname, 'views'),
  // join(__dirname, 'views/common'),  // common-use partials
  // join(__dirname, 'views/wio'),     // words in order 
  // join(__dirname, 'views/home'),    // home
])

// register handlebars partials
hbs.registerPartials(join(__dirname, 'views'))

// great article 'what is middleware?'
// https://stackoverflow.com/questions/23259168/what-are-express-json-and-express-urlencoded/51844327#:~:text=a.-,express.,use(express.
app.use(favicon(join(__dirname, 'public', 'favicon.ico'))) // serve a favicon
app.use(logger('dev')) // logging module that generates log (information)
app.use(express.json()) // recognize the incoming request object as a json object
app.use(express.urlencoded({ extended: false })) // recognize the incoming req obj as strings or arrays
app.use(cookieParser()) //for cookies. I need to dive into it some day.
app.use(express.static(join(__dirname, 'public'))) // from where it'll serve static files, eg css

app.use('/', homeRouter)
app.use('/wio', wioRouter)
app.use('/users', usersRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
