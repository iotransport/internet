+function() {
  var locationTracker = {
    current: ko.observable([-31.956112999999995, 115.8593746])
  };

  if ("geolocation" in navigator) {
    navigator.geolocation.watchPosition(function(position) {
      locationTracker.current([position.coords.latitude,
        position.coords.longitude]);
    }, function(err) { console.log(err) }, {
      enableHighAccuracy: true,
      maximumAge: 30000,
      timeout: 27000
    });
  } else {
    locationTracker.current = false;
  }

  window.locationTracker = locationTracker;
}();
