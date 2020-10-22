const express = require('express')
const app = express()
const createError = require('http-errors')
const join = require('path').join
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const favicon = require('serve-favicon')
const hbs = require('hbs')
const flash = require('express-flash')
const session = require('express-session')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')(session)
const db = require('./server')
const passport = require('passport')
const cors = require('cors')

const { initializePassport } = require('./passport-config')
const User = require('../models/User')
initializePassport(
  passport,
  async name => {
    const db = app.locals.db
    const query = { name }
    const result = await User.findOne(query)
    return result
  },
  async id => {
    const db = app.locals.db
    const query = { _id: id }
    const result = await User.findOne(query)
    return result
  }
)

const homeRouter = require('../routes/homeRoutes')
// import gamesListRouter from './routes/games-list'
const wioRouter = require('../routes/wioRoutes')
const usersRouter = require('../routes/usersRoutes')

// view engine setup
app.set('view engine', 'hbs')
app.set('views', [
  join(__dirname, '../views'),
])

// register handlebars partials
hbs.registerPartials(join(__dirname, '../views'))

app.use(flash())
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
)
app.use(passport.initialize())
app.use(passport.session())
app.use(favicon(join(__dirname, '../public', 'favicon.ico'))) // serves a favicon
app.use(logger('dev')) // logging module that generates log (information)
app.use(express.json()) // recognizes the incoming request object as a json object
app.use(express.urlencoded({ extended: false })) // recognizes the incoming req obj as strings or arrays
app.use(cookieParser()) // for cookies. I need to dive into it some day.
app.use(express.static(join(__dirname, '../public'))) // from where it'll serve static files, eg css
app.use(cors()) // avoid cross origin errors when connecting frontend and backend

// global variables
const games = [
  {
    game: 'Words in Order',
    url: '/wio',
  },
]
app.locals.games = games

// user middleware
app.use(async (req, res, next) => {
  res.locals.user = req.user
  next()
})

const address = process.env.REACT ? '/api' : ''
app.use(address + '/wio', wioRouter)
app.use(address + '/users', usersRouter)
app.use(address + '/', homeRouter)

if (process.env.REACT) {
  app.use(express.static(join(__dirname, '../client/build')))
  app.use('/', (req, res) => {
    res.sendFile(join(__dirname, '../client/build/index.html'))
  })
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).render('404', { message: 'Oops... page not found.' })
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
