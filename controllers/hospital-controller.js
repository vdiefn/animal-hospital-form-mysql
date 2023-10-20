const { Hospital, Location } = require('../models')

const hospitalController = {
  getHospitals: (req, res) => {
    return Hospital.findAll({
      include: Location,
      raw: true,
      nest: true
    })
    .then(hospitals => {
      const data = hospitals.map(r => ({
        ...r,
        description: r.description.substring(0, 50)
      }))
      res.render('hospitals', { hospitals: data })
    })
    .catch(err => next(err))
  }
}

module.exports = hospitalController