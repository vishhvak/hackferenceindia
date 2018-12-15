var database = firebase.database();
function update_location(latitude, longitude) {
  firebase.database().ref('users/' + userId).set({
    username: name,
    email: email,
    profile_picture : imageUrl
  });
}