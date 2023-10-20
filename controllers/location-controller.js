const { Location } = require('../models')

const locationController = {
  getLocations: (req, res, next) => {
    return Promise.all([
      Location.findAll({ raw: true }),
      req.params.id? Location.findByPk(req.params.id, { raw: true }) : null
    ])
    .then(([ locations, location ]) => {
      res.render('admin/locations', { locations, location })
    })
    .catch(err => {
      next(err)
    })
  },
  postLocation: (req, res, next) => {
    const name = req.body.name
    if (!name) throw new Error ('請填寫縣市名稱')
    return Location.create({ name })
      .then(() => res.redirect('/admin/locations'))
      .catch(err => next(err))
  },
  putLocation: (req, res, next) => {
    const name = req.body.name
    if (!name) throw new Error('請填寫欲更改的縣市名稱')
    return Location.findByPk(req.params.id)
    .then(location => {
      if (!location) throw new Error('該縣市名已存在')
      return location.update({ name })
    })
    .then(() => res.redirect('/admin/locations'))
    .catch(err => next(err))
  }
}

module.exports = locationController