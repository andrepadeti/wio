import createError from 'http-errors'
import express, { json, urlencoded } from 'express'
import { join } from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import favicon from 'serve-favicon'
import hbs, { registerHelper, registerPartials } from 'hbs'

import wioRouter from './routes/wio'
import usersRouter from './routes/users'

var app = express()

// register handlebars partials and helpers
hbs.registerPartials(join(__dirname, 'views'))


// view engine setup
app.set('views', [ join(__dirname, 'views'), join(__dirname, 'views/wio') ])

app.set('view engine', 'hbs')


// great article 'what is middleware?'
// https://stackoverflow.com/questions/23259168/what-are-express-json-and-express-urlencoded/51844327#:~:text=a.-,express.,use(express.
app.use(favicon(join(__dirname, 'public', 'favicon.ico'))) // serve a favicon
app.use(logger('dev')) // logging module that generates log (information)
app.use(json()) // recognize the incoming request object as a json object
app.use(urlencoded({ extended: false })) // recognize the incoming req obj as strings or arrays
app.use(cookieParser()) //for cookies. I need to dive into it some day.
app.use(express.static(join(__dirname, 'public'))) // from where it'll serve static files, eg css

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

export default app
