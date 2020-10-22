var express = require('express')
var router = express.Router()
const { checkNotAuthenticated } = require('../bin/passport-config')

const usersController = require('../controllers/usersController')

router.get('/login', checkNotAuthenticated, usersController.getLogin)
router.post('/login', usersController.postLogin)
router.get('/logout', usersController.getLogout)
router.get('/register', usersController.getRegister)
router.post('/register', usersController.postRegister)

module.exports = router
