function writeNewPost(regdata) {
    console.log(regdata)
    var newPostKey = firebase.database().ref().push().key;
    firebase.database().ref(newPostKey).set({
        ...regdata,
        status: "free",
        currentPatient: null,
    }, function (error) {
        if (error) {
            alert('Error!');
        } else {
            localStorage.setItem('ambulance_id', newPostKey)
            localStorage.setItem('driver_name', regdata.name)
            window.location.replace('ambulance.html')
        }
    });
}

function auth(phone) {
    var phoneNumber = phone
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
        'size': 'invisible',
        'callback': function (response) {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            onSignInSubmit();
        }
    });
    var appVerifier = window.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
        .then(function (confirmationResult) {
            confirmationResult = "Enter the OTP sent in the field"
            window.confirmationResult = confirmationResult;
        }).catch(function (error) {
            alert("Error sending OTP");
        });
    var code = document.getElementById("otp")
    confirmationResult.confirm(code).then(function (result) {
        // User signed in successfully.
        var user = result.user;
        window.
    }).catch(function (error) {
        // User couldn't sign in (bad verification code?)
        // ...
    });
}
