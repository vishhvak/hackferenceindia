function writeNewPost(regdata) {
    console.log(regdata)
    var newPostKey = firebase.database().ref().push().key;
    firebase.database().ref(newPostKey).set({
        ...regdata,
        status: "free",
        currentPatient: null,
    }, function(error) {
    if (error) {
      alert('Error!');
    } else {
      localStorage.setItem('ambulance_id', newPostKey)
      localStorage.setItem('driver_name', regdata.name)
      window.location.replace('ambulance.html')
    }
  });
}

