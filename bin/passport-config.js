const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

const initializePassport = (passport, getUserByUsername, getUserById) => {
  const authenticateUser = async (username, password, done) => {
    const user = await getUserByUsername(username)
    // careful!! undefined === null is false, whereas undefined == null is true
    if (user == null) {
      return done(null, false, { message: 'No user with that name' })
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user)
      } else {
        return done(null, false, { message: 'Password incorrect' })
      }
    } catch (error) {
      return done(error)
    }
  }

  passport.use(new localStrategy(authenticateUser))
  passport.serializeUser(async (user, done) => done(null, user._id))
  passport.deserializeUser(async (id, done) => {
    return done(null, await getUserById(id))
  })
}

const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/users/login')
}

const checkNotAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}

module.exports = {
  initializePassport,
  checkAuthenticated,
  checkNotAuthenticated,
}
