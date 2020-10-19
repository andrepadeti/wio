const express = require('express')
const router = express.Router()
const hbs = require('hbs')

router.get('/', async (req, res, next) => {
  if (process.env.REACT) {
    const games = [
      {
        game: 'Words in Order',
        url: '/wio',
      },
    ]
    res.json(games)
  } else {
    res.render('home/home', {
      layout: 'layout',
      tabTitle: 'Round English - Home',
      title: {
        main: 'Language Games',
        // subtitle: 'A collection of ELT Games',
      },
    })
  }
})

module.exports = router
