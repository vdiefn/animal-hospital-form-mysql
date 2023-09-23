const express = require('express')
const router = express.Router()
const { authenticatedAdmin } = require('../../middleware/auth')
const adminController = require('../../controllers/admin-controller')


router.get('/hospitals', authenticatedAdmin, adminController.getHospitals)

router.use('/', (req, res) => res.redirect('/admin/hospitals'))

module.exports = router