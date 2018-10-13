////////////////////////////////////////////////////////////////////////////////
// DURIAN INC.
////////////////////////////////////////////////////////////////////////////////


var getUserCurrentLocation = function () {
  var options = {maximumAge: 5 * 60 * 1000};
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  })
  .then((position) => { return position.coords; })
  .catch(onGeolocationError);
}

var getProfileForUser = function() {
  return getUserCurrentLocation()
    .then((coordinates) => {
      return { coords: coordinates, };
    });
}


/* Calls backend with profile of the current user
   Returns a list of locations/events to display w/relevant information */
var getListFromDatabaseUsingProfile = function(profile) {

  return Array();
};


var formatListOfData = function(list) {
  return false;
};



var onDocumentLoaded = function() {

  /* determine if geolocation is supported; 
     only continue if so */
  var zipCodeProvided = false;
  var enabled = navigator.geolocation || zipCodeProvided;
  if (!enabled) {
    return;
  }

  getProfileForUser()
  .then(getListFromDatabaseUsingProfile)
  .then(formatListOfData);
};


window.onload = onDocumentLoaded;

function onGeolocationError(error) {
  console.log('Error occurred. Error code: ' + error.code);
  switch (error.code) {
    case 0: console.log('\tUnknown error'); break;
    case 1: console.log('\tPermission denied'); break;
    case 2: console.log('\tPosition unavailable ' +
        '(error response from location provider)'); 
      break;
    case 3: console.log('\tTimed out'); break;
  }
};