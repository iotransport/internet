ko.bindingHandlers.leafletMapFleet = {
  init: function(element, valueAccessor) {
    var map = L.map(element, {});
    element.leafletMap = map;
    L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/{type}/{z}/{x}/{y}.png',
      {
        type: 'map',
        subdomains: ['1', '2', '3', '4']
      }).addTo(map);
    var value = valueAccessor();
    var center = value.center();
    element.leafletMap.setView(L.latLng(center[0],
      center[1]), value.zoom || 14);
  },
  update: function(element, valueAccessor) {
    if (!valueAccessor().fleets || !valueAccessor().fleets().length) {
      return true;
    };
    var fleets = {};
    element.fleets = fleets;

    var popupContent = function(thing, snapshots) {
      console.log(snapshots)
      var content = '' +
        '<h4>' + thing.title + '</h4>' +
        '<p>' + thing.description + '</p>' +
        '<ul>' +
          snapshots.map(function(snapshot) {
            if (!snapshot.count) {
              return ''
            }
            return '<li class="list-unstyled">' + 
              'time: ' + moment(snapshot.createdAt).fromNow() +
              ', count: ' + snapshot.count +
              ', temperature: ' + snapshot.temperature +
              ', humidity: ' + snapshot.humidity +
            '</li>'
          }).join('')
        '</ul>'
      return content;
    }
    async.forEach(valueAccessor().fleets(), function(fleet, cb) {
      fleets[fleet.title] = fleet;
      async.map(fleet.things, function(thing, cb) {
        io.socket.get('/snapshot', {sort: 'createdAt DESC', limit: 5},
          function(snapshots, jwres) {
            var marker = L.marker(L.latLng(thing.geom.coordinates[1],
              thing.geom.coordinates[0]));
            marker
              .bindPopup(popupContent(thing, snapshots))
              .openPopup();
            cb(null, marker);
          }
        )
      }, function(err, results) {
        fleets[fleet.title].featureGroup = L.featureGroup(results)
        cb(null, fleet)
      })
    }, function() {
      var overlayMaps = {};
      if (!Object.keys(fleets).length) {
        return true;
      }
      Object.keys(fleets).forEach(function(key) {
        overlayMaps[key] = fleets[key].featureGroup;
        fleets[key].featureGroup
          .addTo(element.leafletMap)
      })
      L.control.layers({}, overlayMaps, {
          collapsed: false
        })
        .addTo(element.leafletMap)
    })
  }
};
