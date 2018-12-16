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
    console.log(latlng);
    
    var ambulance_marker = {
          url: 'https://cdn3.iconfinder.com/data/icons/medical-healthcare-vol-3/48/health_hospital_medical_healthcare_medicalcare_doctor_clinic_physician_physic_flag_location_map_pointer_marker_pin_place_point-512.png',
          scaledSize: new google.maps.Size(50, 50),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(0, 0)
    };
    
    var user_marker = {
          url: 'https://img.icons8.com/color/1600/person-male.png',
          scaledSize: new google.maps.Size(50, 50),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(0, 0)
    };
    
    var marker = new google.maps.Marker({
          position: latlng,
          icon: user_marker,
          map: map
    });
    
    // Plot all ambulance markers now
    ambulanceMarkerOperations(position.coords, ambulance_marker);
    
    map.setZoom(13);
    map.panTo(latlng)
    
}