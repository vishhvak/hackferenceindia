/**
 * Utility file for fetching geolocation from user's
 * browser.
 */

 const getGeolocation = (callback) => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(callback);
      } else {
        alert("OOPSS YOU ARE GOING TO DIE");
      }
}

// const getGeolocation = () => {
//     let values = {}

//     const setValues = ({ coords }) => {
//         console.log(coords)
//         values = {
//             ...coords,
//         }
//     }

//     _get(setValues)

//     return values
// }