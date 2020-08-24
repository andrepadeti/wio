var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var favicon = require('serve-favicon')
var hbs = require('hbs')

var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')

var app = express()

// register handlebars partials and helpers
hbs.registerPartials(path.join(__dirname, 'views'))
hbs.registerHelper('incremented', index => ++index)

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')


// great article 'what is middleware?'
// https://stackoverflow.com/questions/23259168/what-are-express-json-and-express-urlencoded/51844327#:~:text=a.-,express.,use(express.
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico'))) // serve a favicon
app.use(logger('dev')) // logging module that generates log (information)
app.use(express.json()) // recognize the incoming request object as a json object
app.use(express.urlencoded({ extended: false })) // recognize the incoming req obj as strings or arrays
app.use(cookieParser()) //for cookies. I need to dive into it some day.
app.use(express.static(path.join(__dirname, 'public'))) // from where it'll serve static files, eg css

app.use('/', indexRouter)
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
