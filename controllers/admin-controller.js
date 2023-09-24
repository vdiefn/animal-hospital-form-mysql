const { Hospital } = require('../models')

const adminController = {
  getHospitals: (req, res, next) => {
    Hospital.findAll({
      raw: true
    })
    .then(hospitals => {
      res.render('admin/hospitals', { hospitals })
    })
    .catch(err => {
      next(err)
    })
  },
  createHospital: (req, res, next) => {
    return res.render('admin/create-hospital')
  },
  postHospital: (req, res, next) => {
    const { name, city, tel, address, description, image, openingHours, closingHours, website } = req.body
    console.log(req.body)
    if (!name ) throw new Error('請填上醫院名稱！')
    if (!city) throw new Error('請填上醫院所在縣市！')
    if (!tel) throw new Error('請填上醫院電話號碼！')
    if (!openingHours || !closingHours) throw new Error('請填上醫院營業時間！')
    if (!description) throw new Error('請填上醫院簡介！')
    Hospital.create({
      name,
      city,
      tel,
      address,
      description,
      image,
      openingHours,
      closingHours,
      website
    })
    .then(() => {
      req.flash('success_messages', '已成功新增醫院資訊！')
      res.redirect('/admin/hospitals')
    })
    .catch(err => next(err))
  }
}

module.exports = adminController