const express = require('express')
const router = express.Router()
const hbs = require('hbs')

router.get('/', async (req, res, next) => {
  res.render('home/home', {
    layout: 'layout',
    tabTitle: 'Round English - Home',
    title: {
      main: 'Language Games',
      // subtitle: 'A collection of ELT Games',
    },
  })
})

module.exports = router
