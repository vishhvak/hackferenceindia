
const database = firebase.database()

const nearby_ambulances = [];

// Threshold is 2500 metres for the ambulance
const THRESHOLD = 3000;

const ambulanceMarkerOperations = (user_pos, ambulance_marker) => {
    database.ref("/").on("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const amb_id = childSnapshot.key;
            const amb_details = childSnapshot.val()
            console.log(amb_id, amb_details)
            
            // Haversine distance between the user and the current ambulance
            const distBetw = haversineDistance(amb_details.GPS, user_pos)
            
            if (distBetw > THRESHOLD) {
                // Skip plotting ambulance if it's not in the radius
                return;
            }

            const latlng = {
                lat: amb_details.GPS.latitude,
                lng: amb_details.GPS.longitude,
            }
            // Plot the ambulance as a marker
            var marker = new google.maps.Marker({
                position: latlng,
                icon: ambulance_marker,
                map: map
          });
        })
    })
}