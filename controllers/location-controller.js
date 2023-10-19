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
  }
}

module.exports = locationController