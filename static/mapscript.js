
let map;
let markers = []
let autocomplete;

function initMap() {
  const mapOptions = {
    zoom: 8,
    center: { lat: 35.209, lng: -97.441 },
    mapTypeId: "roadmap",
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    zoomControl: false,
    disableDoubleClickZoom: true
  };

  map = new google.maps.Map(document.getElementById("map"), mapOptions);

  const icon = {
    url: "coffee.jpg", 
    scaledSize: new google.maps.Size(40, 40), 
    origin: new google.maps.Point(0,0), 
    anchor: new google.maps.Point(0, 0) 
  };

  const marker = new google.maps.Marker({
    position: { lat: 35.209, lng: -97.441 },
    map: map,
    icon: icon
  });

  markers.push(marker);
  initAutocomplete();
}


function addMarker(location) {

    function isLocationFree(search) {
        for (var i = 0, l = lookup.length; i < l; i++) {
          if (lookup[i][0] === search[0] && lookup[i][1] === search[1]) {
            return false;
          }
        }
        return true;
      }
      

    var lookup = [];

    const icon = {
        url: "coffee.jpg", 
        scaledSize: new google.maps.Size(40, 40), 
        origin: new google.maps.Point(0, 0), 
        anchor: new google.maps.Point(0, 0) 
    };


    if (isLocationFree(location)) {
        lookup.push(location);
        const marker = new google.maps.Marker( {
            position: location,
            map,
            icon: icon,
            title: "Click to zoom"
        })

        marker.addListener('click', () => {
            map.setZoom(15);
            map.setCenter(marker.getPosition());
        })

        marker.addListener('dblclick', () => {
            marker.setMap(null);
            map.setZoom(14);
        })
    };
}

function testMarker() {
    somewhere = new google.maps.LatLng(35.100, -97.441);
    addMarker(somewhere);
}

function initAutocomplete() {

    this.map = map

    autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('autocomplete'),
        {
            types: ['establishment'],
            componentRestrictions: {'country': ['US']},
            fields: ['place_id', 'geometry', 'name']
        });
        
    autocomplete.addListener('place_changed', onPlaceChanged);

}

function onPlaceChanged() {
    var place = autocomplete.getPlace();

    if (!place.geometry || !place.geometry.location) {
        window.alert("No details available for input: '" + place.name + "'");
        return;
    }

    if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
        addMarker(place.geometry.location);
        
    } 
    else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
        addMarker(place.geometry.location);
    }

    marker.setPosition(place.geometry.location);
    marker.setVisible(true);
    infowindowContent.children["place-name"].textContent = place.name;
    infowindowContent.children["place-address"].textContent = place.formatted_address;
    infowindow.open(map, marker);
}

function clearMarkers() {
    for (var i = 0, l = markers.length; i < l; i++) {
        markers[i].setMap(null);
    }
}

