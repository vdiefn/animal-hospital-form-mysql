const { Location } = require('../models')

const locationController = {
  getLocations: (req, res, next) => {
    return Location.findAll({
      raw: true
    })
    .then(locations => {
      res.render('admin/locations', { locations })
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
  }
}

module.exports = locationController