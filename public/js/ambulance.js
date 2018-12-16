const $patientStuff = document.querySelector("#patientDetails");
$patientStuff.style.display = "none";

const id = localStorage.getItem("ambulance_id");

const push_location = latlng => {
  console.log("sup");
  const gpsref = firebase.database().ref(id + "/GPS");
  gpsref.update({
    latitude: latlng.lat,
    longitude: latlng.lng
  });
};

let map, marker, ambulance_icon, user_icon;
const update_marker = latlng => {
  if (marker) {
    marker.setPosition(latlng);
  } else {
    marker = new google.maps.Marker({
      position: latlng,
      icon: ambulance_marker,
      map: map
    });
  }
  map.panTo(latlng);
};

// Status update
firebase
  .database()
  .ref(id)
  .on("value", snapshot => {
    const amb = snapshot.val();
    console.log(amb);
    const status = document.querySelector("#status");
    const currentStatus = status.textContent;
    status.textContent = amb.status;

    if (amb.status === "onduty" && currentStatus !== "onduty") {
      const currentPatient = amb.currentPatient;
      fillUpPatientDetails(currentPatient);
    } else {
      $patientStuff.style.display = "none";
    }
  });

const fillUpPatientDetails = ({ name, phone, situation }) => {
  document.querySelector("#name").textContent = "Name: " + name;
  document.querySelector("#phone").textContent = "phone: " + phone;
  document.querySelector("#situation").textContent = "situation: " + situation;

  // unhide the detils div
  $patientStuff.style.display = "block";
};

function myMap() {
  ambulance_marker = {
    url:
      "https://cdn3.iconfinder.com/data/icons/medical-healthcare-vol-3/48/health_hospital_medical_healthcare_medicalcare_doctor_clinic_physician_physic_flag_location_map_pointer_marker_pin_place_point-512.png",
    scaledSize: new google.maps.Size(50, 50),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(0, 0)
  };

  user_marker = {
    url: "https://img.icons8.com/color/1600/person-male.png",
    scaledSize: new google.maps.Size(50, 50),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(0, 0)
  };

  var mapProp = {
    center: new google.maps.LatLng(28.7041, 77.1025),
    zoom: 5
  };
  //Loads map element in id="map"
  map = new google.maps.Map(document.getElementById("map"), mapProp);

  const watchID = navigator.geolocation.watchPosition(function({ coords }) {
    const latlng = {
      lat: coords.latitude,
      lng: coords.longitude
    };
    push_location(latlng);
    update_marker(latlng);
  });

  map.setZoom(13);
}
