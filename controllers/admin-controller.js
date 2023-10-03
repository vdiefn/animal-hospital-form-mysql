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
  },
  getHospital:(req, res, next) => {
    Hospital.findByPk(req.params.id, {
      raw: true
    })
    .then(hospital => {
      if(!hospital) throw new Error('該家醫院不存在！')
      res.render('admin/hospital', { hospital })
    })
    .catch(err => next(err))
  },
  editHospital:(req, res, next) => {
    Hospital.findByPk(req.params.id, {
      raw: true
    })
    .then(hospital => {
      if (!hospital) throw new Error ('該醫院不存在！')
      res.render('admin/edit-hospital', { hospital })
    })
    .catch(err => next(err))
  },
  putHospital: (req, res, next) => {
    const { name, city, tel, address, description, image, openingHours, closingHours, website } = req.body
    if (!name) throw new Error('請填上醫院名稱！')
    if (!city) throw new Error('請填上醫院所在縣市！')
    if (!tel) throw new Error('請填上醫院電話號碼！')
    if (!openingHours || !closingHours) throw new Error('請填上醫院營業時間！')
    if (!description) throw new Error('請填上醫院簡介！')
    Hospital.findByPk(req.params.id )
      .then(hospital => {
        if(!hospital) throw new error('該醫院不存在！')
        return hospital.update({
          name,
          city,
          address,
          description,
          openingHours,
          closingHours,
          website
        })
      })
      .then(() => {
        req.flash('success_messages', '已成功修改醫院資訊！')
        res.redirect('/admin/hospitals')
      })
      .catch(err => next(err))
    } 
}

module.exports = adminController