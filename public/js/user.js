//LOAD MAP CANVAS
var map;
function myMap() {
    var mapProp= {
                    center:new google.maps.LatLng(28.7041, 77.1025),
                    zoom:5,    
    };
    //Loads map element in id="googleMap"
    map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
    }
    
    //Checks support
    function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
    }
    
    
function showPosition(position) {
    var latitude = position.coords.latitude
    var longitude = position.coords.longitude
    var latlng = {lat: latitude, lng: longitude};
    
    var geocoder = new google.maps.Geocoder;
    geocoder.geocode({'location': latlng}, function(results, status) {
          if (status === 'OK') {
            if (results[0]) {
              map.setZoom(15);
              var marker = new google.maps.Marker({
                position: latlng,
                map: map
              });
              //ZOOM INTO THE LOCATION OF USER
              map.panTo(latlng);
              infowindow.setContent(results[0].formatted_address);
              infowindow.open(map, marker);
            } else {
              window.alert('No results found');
            }
          } else {
            window.alert('Geocoder failed due to: ' + status);
          }
        });
}