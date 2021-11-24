const express = require('express')
const router = express.Router()

const { getRegister, postRegister } = require('./../controllers/authController.js')

router.get('/signup', getRegister)
router.post('/signup', postRegister)

module.exports = router