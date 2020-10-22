const express = require('express')
const router = express.Router()
const hbs = require('hbs')
const { checkAuthenticated } = require('../bin/passport-config')

const wioController = require('../controllers/wioController')

// helper to pass sentences to the client javascript file
hbs.registerHelper('convert', data => JSON.stringify(data))
// helper to show @index starting from 1
hbs.registerHelper('incremented', index => ++index)

router.get('/', wioController.indexOfActivities)
router.get('/create', checkAuthenticated, wioController.createNewActivity)
router.post('/submit', wioController.insertNewActivity)
router.get('/:id', wioController.wioGame)

module.exports = router