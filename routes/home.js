const express = require('express')
const router = express.Router()
const hbs = require('hbs')

router.get('/', async (req, res, next) => {
  const baseScripts = req.app.locals.baseScripts
  if (req.user) console.log(req.user._id)
  res.render('home/home', {
    layout: 'layout',
    tabTitle: 'Round English - Home',
    title: {
      main: 'ELT Games',
      subtitle: 'A collection of ELT Games',
    },
  })
})

module.exports = router
