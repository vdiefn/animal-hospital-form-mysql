const { Hospital, User, Location } = require('../models')
const { localFileHandler } = require('../helpers/file-helpers')
const { imgurFileHandler } = require('../helpers/file-helpers')

const adminController = {
  getHospitals: (req, res, next) => {
    Hospital.findAll({
      raw: true,
      nest: true,
      include: [Location]
    })
    .then(hospitals => {
      res.render('admin/hospitals', { hospitals })
    })
    .catch(err => {
      next(err)
    })
  },
  createHospital: (req, res, next) => {
    return Location.findAll({
      raw: true
    })
    .then(locations => res.render('admin/create-hospital', { locations }))
    .catch(err => next(err))
  },
  postHospital: (req, res, next) => {
    const { name, tel, address, description, openingHours, closingHours, website, locationId } = req.body
    const { file } = req
    if (!name ) throw new Error('請填上醫院名稱！')
    if (!locationId) throw new Error('請填上醫院所在縣市位置！')
    if (!tel) throw new Error('請填上醫院電話號碼！')
    if (!openingHours || !closingHours) throw new Error('請填上醫院營業時間！')
    if (!description) throw new Error('請填上醫院簡介！')
    imgurFileHandler(file)
      .then(filePath => Hospital.create({
        name,
        tel,
        address,
        description,
        image: filePath || null,
        openingHours,
        closingHours,
        website,
        locationId
      }))
    .then(() => {
      req.flash('success_messages', '已成功新增醫院資訊！')
      res.redirect('/admin/hospitals')
    })
    .catch(err => next(err))
  },
  getHospital:(req, res, next) => {
    Hospital.findByPk(req.params.id, {
      raw: true,
      nest: true,
      include: [Location]
    })
    .then(hospital => {
      if(!hospital) throw new Error('該家醫院不存在！')
      res.render('admin/hospital', { hospital })
    })
    .catch(err => next(err))
  },
  editHospital:(req, res, next) => {
    return Promise.all([
      Hospital.findByPk(req.params.id, {
        raw: true
      }),
      Location.findAll({
        raw: true
      })
    ])
    .then(([hospital, locations ]) => {
      if (!hospital) throw new Error ('該醫院不存在！')
      res.render('admin/edit-hospital', { hospital, locations })
    })
    .catch(err => next(err))
  },
  putHospital: (req, res, next) => {
    const { name, tel, address, description, openingHours, closingHours, website, locationId } = req.body
    const { file } = req
    if (!name) throw new Error('請填上醫院名稱！')
    if (!locationId) throw new Error('請填上醫院所在縣市位置！')
    if (!tel) throw new Error('請填上醫院電話號碼！')
    if (!openingHours || !closingHours) throw new Error('請填上醫院營業時間！')
    if (!description) throw new Error('請填上醫院簡介！')
    Promise.all([
      Hospital.findByPk(req.params.id),
      imgurFileHandler(file)
  ])
    .then(([hospital, filePath]) => {
      if(!hospital) throw new error('該醫院不存在！')
      return hospital.update({
        name,
        address,
        description,
        openingHours,
        closingHours,
        website,
        image: filePath || hospital.image,
        locationId
      })
    })
    .then(() => {
      req.flash('success_messages', '已成功修改醫院資訊！')
      res.redirect('/admin/hospitals')
    })
    .catch(err => next(err))
  },
  deleteHospital: (req, res, next) => {
    Hospital.findByPk(req.params.id)
      .then(hospital => {
        if (!hospital) throw new Error('該醫院不存在！')
        return hospital.destroy()
      })
      .then(() => res.redirect('/admin/hospitals'))
      .catch(err => next(err))
  },
  getUsers: (req, res, next) => {
    return User.findAll({
      raw: true
    })
      .then(users => res.render('admin/users', { users }))
      .catch(err => next(err))
  },
  patchUser: (req, res, next) => {
    return User.findByPk(req.params.id)
    .then(user => {
      if (!user) throw new Error('該使用者不存在！')
      if (user.email === 'root@example.com'){
        req.flash('error_messages', '不可變更該名管理員的權限！')
        return res.redirect('back')
      }
      console.log(user)
      user.update({ isAdmin: !user.isAdmin})
      req.flash('success_messages', '使用者權限變更成功！')
      return res.redirect('/admin/users') 
    })
    .catch(err => next(err))
  }
}

module.exports = adminController