const express = require('express')
const router = express.Router()
const adminController = require('../../controllers/admin-controller')


router.get('/hospitals/create', adminController.createHospital)

router.get('/hospitals/:id/edit', adminController.editHospital)
router.put('/hospitals/:id', adminController.putHospital)

router.get('/hospitals/:id', adminController.getHospital)
router.post('/hospitals', adminController.postHospital)


router.get('/hospitals', adminController.getHospitals)


router.use('/hospitals', (req, res) => res.redirect('/admin/hospitals'))

module.exports = router