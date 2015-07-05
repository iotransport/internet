var stations = require('./stations2.json');
stations = stations.map(function(item) {
  return {
    title: item.name,
    identifier: item.identifier,
    geom: {
      type: 'Point',
      coordinates: [
        item.lng,
        item.lat
      ]
    }
  }
})

module.exports = function(cb) {
  Station.find({}).exec(function(err, result) {
    if (result && result.length) {
      return cb('already loaded')
    }
    Station.create(stations, function(err, results) {
      if (err) {
        throw err
      }
      cb()
    })
  })
}
