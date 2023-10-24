const { Hospital, Location } = require('../models')

const hospitalController = {
  getHospitals: (req, res, next) => {
    const locationId = Number(req.query.locationId) || ''
    return Promise.all([
      Hospital.findAll({
        include: Location,
        where: {
          ...locationId ? { locationId } : {}
        },
        raw: true,
        nest: true
      }),
      Location.findAll({raw: true})  
    ])
    .then(([hospitals, locations]) => {
      const data = hospitals.map(r => ({
        ...r,
        description: r.description.substring(0, 50)
      }))
      console.log(locationId)
      res.render('hospitals', { hospitals: data, locations, locationId })
    })
    .catch(err => next(err))
  },
  getHospital:(req, res, next) => {
    return Hospital.findByPk(req.params.id, {
      include: Location
    })
    .then(hospital => {
      if(!hospital) throw new Error('該醫院不存在！')
      hospital.increment('viewCounts', { by: 1 })
      res.render('hospital', { hospital: hospital.toJSON() })
    })
    .catch(err => next(err))
  },
  getDashboard: (req, res, next) => {
    return Hospital.findByPk(req.params.id, {
      include: Location
    })
    .then(hospital => {
      res.render('dashboard', { hospital: hospital.toJSON() })
    })
    .catch(err => next(err))
  }
}

module.exports = hospitalController