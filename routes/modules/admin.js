const express = require('express')
const router = express.Router()
const adminController = require('../../controllers/admin-controller')


router.get('/hospitals/create', adminController.createHospital)
router.post('/hospitals', adminController.postHospital)

router.get('/hospitals/:id', adminController.getHospital)

router.get('/hospitals', adminController.getHospitals)


router.use('/hospitals', (req, res) => res.redirect('/admin/hospitals'))

module.exports = router