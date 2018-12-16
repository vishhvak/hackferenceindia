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

//window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
//  'size': 'invisible',
//  'callback': function(response) {
//    // reCAPTCHA solved, allow signInWithPhoneNumber.
//    onSignInSubmit();
//    console.log('yes');
//  }
//});
//
//  /**
//   * Function called when clicking the Login/Logout button.
//   */
//  function onSignInSubmit() {
//    if (isPhoneNumberValid()) {
//      window.signingIn = true;
//      var phoneNumber = getPhoneNumberFromUserInput();
//      var appVerifier = window.recaptchaVerifier;
//      firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
//          .then(function (confirmationResult) {
//            // SMS sent. Prompt user to type the code from the message, then sign the
//            // user in with confirmationResult.confirm(code).
//            window.confirmationResult = confirmationResult;
//            window.signingIn = false;
//          }).catch(function (error) {
//            // Error; SMS not sent
//            console.error('Error during signInWithPhoneNumber', error);
//            window.alert('Error during signInWithPhoneNumber:\n\n'
//                + error.code + '\n\n' + error.message);
//            window.signingIn = false;
//          });
//    }
//  }
//
//  /**
//   * Function called when clicking the "Verify Code" button.
//   */
//  function onVerifyCodeSubmit(e) {
//    e.preventDefault();
//    if (!!getCodeFromUserInput()) {
//      window.verifyingCode = true;
//      var code = getCodeFromUserInput();
//      confirmationResult.confirm(code).then(function (result) {
//        // User signed in successfully.
//        var user = result.user;
//        window.verifyingCode = false;
//        window.confirmationResult = null;
//        updateVerificationCodeFormUI();
//      }).catch(function (error) {
//        // User couldn't sign in (bad verification code?)
//        console.error('Error while checking the verification code', error);
//        window.alert('Error while checking the verification code:\n\n'
//            + error.code + '\n\n' + error.message);
//        window.verifyingCode = false;
//      });
//    }
//  }
//
//   /* Reads the verification code from the user input.
//   */
//  function getCodeFromUserInput() {
//    return document.getElementById('otp').value;
//  }
//
//  /**
//   * Reads the phone number from the user input.
//   */
//  function getPhoneNumberFromUserInput() {
//    return document.getElementById('phone').value;
//  }
//
//  /**
//   * Returns true if the phone number is valid.
//   */
//  function isPhoneNumberValid() {
//    var pattern = /^\+[0-9\s\-\(\)]+$/;
//    var phoneNumber = getPhoneNumberFromUserInput();
//    return phoneNumber.search(pattern) !== -1;
//  }
//
//  /**
//   * Re-initializes the ReCaptacha widget.
//   */
//  function resetReCaptcha() {
//    if (typeof grecaptcha !== 'undefined'
//        && typeof window.recaptchaWidgetId !== 'undefined') {
//      grecaptcha.reset(window.recaptchaWidgetId);
//    }
//  }