const { Hospital, Location } = require('../models')
const { getOffset, getPagination } = require('../helpers/pagination-helper')

const hospitalController = {
  getHospitals: (req, res, next) => {
    const locationId = Number(req.query.locationId) || ''
    const DEFAULT_LIMIT = 8
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || DEFAULT_LIMIT
    const offset = getOffset(limit, page)
    return Promise.all([
      Hospital.findAndCountAll({
        include: Location,
        where: {
          ...locationId ? { locationId } : {}
        },
        limit,
        offset,
        nest: true,
        raw: true
      }),
      Location.findAll({raw: true})  
    ])
    .then(([hospitals, locations]) => {
      const data = hospitals.rows.map(r => ({
        ...r,
        description: r.description.substring(0, 50)
      }))
      return res.render('hospitals', { 
        hospitals: data, 
        locations, 
        locationId,
        pagination: getPagination(limit, page, hospitals.count) 
      })
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