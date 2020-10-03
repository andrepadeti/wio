var express = require('express')
var router = express.Router()
const bcrypt = require('bcrypt')
const passport = require('passport')
const User = require('../models/User')
const { checkNotAuthenticated } = require('../bin/passport-config')

router.get('/login', checkNotAuthenticated, (req, res, next) => {
  const success_msg = req.flash('success_msg')
  const error_msg = req.flash('error')
  res.render('users/login', {
    layout: 'layout',
    success_msg,
    error_msg,
  })
})

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true,
  })
)

router.get('/logout', (req, res) => {
  req.logOut()
  req.flash('success_msg', 'You are logged out.')
  res.redirect('/users/login')
})

router.get('/register', (req, res, next) => {
  res.render('users/register', { layout: 'layout' })
})

router.post('/register', async (req, res, next) => {
  const { name, email, password, password2 } = req.body
  let errors = checkFormFields(name, email, password, password2)
  // console.log('Not checking form fields')
  // let errors = []

  if (errors.length > 0) {
    res.render('users/register', {
      layout: 'layout',
      errors,
      name,
      email,
      password,
      password2,
    })
  } else {
    // forms fields have been correctly filled in
    try {
      const isNameUsed = await User.findOne({ name })
      const isEmailUsed = await User.findOne({ email })
      if (isNameUsed) {
        errors.push({ msg: 'Username already exists' })
      }
      if (isEmailUsed) {
        errors.push({ msg: 'Email already exists' })
      }
      if (errors.length > 0) {
        res.render('users/register', {
          layout: 'layout',
          errors,
          name,
          email,
          password,
          password2,
        })
      } else {
        // passed all tests
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({
          name,
          email,
          password: hashedPassword,
          date: new Date(),
        })
        await newUser.save()
        req.flash('success_msg', 'You are now registered and can log in')
        res.redirect('/users/login')
      }
    } catch (error) {
      res.render('404', {
        message: "Oops... we've had problems.",
        error,
      })
    }
  }
})

module.exports = router

// checks if fields have been filled in correctly
const checkFormFields = (name, email, password, password2) => {
  let errors = []

  // check required fields
  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please fill in all fields' })
  }

  // check passwords match
  if (password !== password2) {
    errors.push({ msg: 'Passwords do not match' })
  }

  // check password length
  if (password.length < 6) {
    errors.push({ msg: 'Password should be at least 6 characters' })
  }

  return errors
}
