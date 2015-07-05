ko.bindingHandlers.leafletMapMarker = {
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
    element.leafletMap.setView(L.latLng(center[0], center[1]), value.zoom || 12);
  },
  update: function(element, valueAccessor) {
    if (!valueAccessor().stations().length) {
      return;
    }
    var markers = valueAccessor().stations().map(function(station) {
      var marker = L.marker(L.latLng(station.geom.coordinates[1],
        station.geom.coordinates[0]))
      marker.originalData = station;
      marker.on('click', function(e) {
        var station = e.target.originalData;
        valueAccessor().point(station.title)
      })
      return marker;
    })
    L.layerGroup(markers)
      .addTo(element.leafletMap);
  }
};
