
const database = firebase.database()

const nearby_ambulances = [];

const initDb = (user_pos) => {
    database.ref("/").on("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const amb_id = childSnapshot.key;
            const amb_details = childSnapshot.val()
            console.log(amb_id, amb_details)
            console.log(haversineDistance(amb_details.GPS, user_pos))
        })
    })
}

navigator.geolocation.getCurrentPosition(({ coords }) => {
    initDb(coords)
})