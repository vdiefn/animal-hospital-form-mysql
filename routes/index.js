const express = require('express')
const router = express.Router()
const hospitalController = require('../controllers/hospital-controller')
const userController = require('../controllers/user-controller')
const admin = require('./modules/admin')
const { authenticated, authenticatedAdmin } = require('../middleware/auth')
const { generalErrorHandler } = require('../middleware/error-handler')
const passport = require('../config/passport')

router.use('/admin', authenticatedAdmin, admin)

router.get('/hospitals', hospitalController.getHospitals)

router.get('/signup', userController.signUpPage)
router.post('/signup', userController.signUp)

router.get('/signin', userController.signInPage)
router.post('/signin', passport.authenticate('local', { failureRedirect: '/signup', failureFlash: true }), userController.signIn)

router.get('/logout', userController.logout)

router.use('/', (req, res) => res.redirect('/hospitals'))
router.use('/', generalErrorHandler)

module.exports = router