const express = require('express')
const router = express.Router()

const { register } = require('../controllers/usersController')

router.get('/', register)

module.exports = router