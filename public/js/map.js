console.log("hxi")

let map, directionsDisplay, directionsService;
function initMap() {
  map = new google.maps.Map(document.getElementById("gmap"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 13,
  });

  directionsDisplay = new google.maps.DirectionsRenderer()
  directionsService = new google.maps.DirectionsService()

  directionsDisplay.setMap(map)

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        const pos = {
          lat: latitude,
          lng: longitude,
        };

        // Plot user marker
        // plotUser(pos)
        getAmbulanceData(pos)
        // Fetch and mark ambulance marker
      },
      error => {
        console.error(error);
      },
    );
  }
}  
/*
// const plotUser = (pos) => {
//     const infowindow = new google.maps.InfoWindow();
//     infowindow.setPosition(pos);
//     infowindow.setContent("Drone location");

//     const userMarker = new google.maps.Marker({
//       position: pos,
//       map: map,
//     });

//     map.panTo(pos);
// } */

const getAmbulanceData = (user_pos) => {
    const assigned_amb = localStorage.getItem("assigned_amb")
    const database = firebase.database()
    database.ref(assigned_amb + "/GPS").once("value").then(function(snapshot) {
        const val = snapshot.val()
        const amb_pos = {
            lat: val.latitude,
            lng: val.longitude,
        }
        // plotAmbulance(amb_pos)
        plotRoute(amb_pos, user_pos)
    })
}

const plotRoute = (ambulance, user) => {

    const request = {
        origin: ambulance,
        destination: user,
        travelMode: 'DRIVING',
    }

    directionsService.route(request, (result, status) => {
        if (status=='OK'){
            directionsDisplay.setDirections(result)
            console.log(result)
        }
    })
}

// const plotAmbulance = (pos) => {
//     const ambMarker = new google.maps.Marker({
//         position: pos,
//         map: map,
//       });
// }

// const plotUserLocation = (pos) => {
//     const infowindow = new google.maps.InfoWindow();
//         infowindow.setPosition(pos);
//         infowindow.setContent("User location");

//         const userMarker = new google.maps.Marker({
//           position: pos,
//           map: map,
//         });
// }

// const setUserPosition = ({ coords }) => {
//     console.log(coords)
//     const pos = {
//         lat: coords.latitude,
//         lng: coords.longitude,
//     }
//     // Plot user's location on map
//     plotUserLocation(pos)
//     // Subscribe to ambulance data

//     // Plot ambulance on map

//     // Route ambulance to user

//     // Live update
// }

// getGeolocation(setUserPosition)