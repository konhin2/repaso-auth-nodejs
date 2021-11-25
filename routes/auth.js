const express = require('express')
const router = express.Router()

const { 
    getRegister, 
    postRegister, 
    getLogin,
    postLogin,
    postLogout
} = require('./../controllers/authController.js')

const { isLoggedIn, isLoggedOut } = require('./../middlewares/route-guard')

router.get('/signup', isLoggedOut, getRegister)
router.post('/signup', postRegister)

router.get('/login', isLoggedOut, getLogin)
router.post('/login', postLogin)

router.post('/logout', isLoggedIn, postLogout)

module.exports = router