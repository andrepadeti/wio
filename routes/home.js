const express = require('express')
const router = express.Router()
const hbs = require('hbs')

router.get('/', (req, res, next) => {
  const baseScripts = req.app.locals.baseScripts
  res.render('home/home', {
    layout: 'layout',
    tabTitle: 'Round English - Home',
    title: {
      main: 'ELT Games',
      subtitle: 'A collection of ELT Games',
    },
    scripts: baseScripts,
  })
})

module.exports = router
