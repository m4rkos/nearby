module.exports = function(app) {

    var map = createMap(app);

    app.addListener('location', function(geometry) {
        var latLng = geometryToLatLng(geometry);

        map.setCenter(latLng);
    });

    var markers = [];

    app.addListener('message', function(geometries) {
        markers.forEach(function(marker) {
            marker.setMap(null);
        });

        markers = [];

        geometries.forEach(function(geometry) {
            var latLng = geometryToLatLng(geometry);

            var marker = new google.maps.Marker({
                position: latLng, map: map, draggable: true
            });

            markers.push(marker);
        });
    });

};

function createMap(app) {
    return new google.maps.Map(app.$element, {
        zoom: 16
    });
}

function geometryToLatLng(geometry) {
    var latitude = geometry.coordinates[0];
    var longitude = geometry.coordinates[1];

    return new google.maps.LatLng(latitude, longitude);
}
