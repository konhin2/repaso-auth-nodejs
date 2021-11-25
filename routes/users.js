const express = require('express')
const router = express.Router()

const { profile } = require('../controllers/usersController')

const { isLoggedIn } = require('./../middlewares/route-guard')

router.get('/profile', isLoggedIn, profile)

module.exports = router