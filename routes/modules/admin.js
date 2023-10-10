const express = require('express')
const router = express.Router()
const adminController = require('../../controllers/admin-controller')
const upload = require('../../middleware/multer')

router.get('/hospitals/create', adminController.createHospital)

router.get('/hospitals/:id/edit', adminController.editHospital)
router.put('/hospitals/:id', upload.single('image'), adminController.putHospital)

router.get('/hospitals/:id', adminController.getHospital)
router.post('/hospitals', upload.single('image'), adminController.postHospital)

router.get('/users', adminController.getUsers)
router.patch('/users/:id', adminController.patchUser)

router.delete('/hospitals/:id', adminController.deleteHospital)

router.get('/hospitals', adminController.getHospitals)


router.use('/hospitals', (req, res) => res.redirect('/admin/hospitals'))

module.exports = router