function initStreet () {
// Run processURLChange when Enter pressed on input field
  // This function should probably be somewhere else
  document.getElementById('input-url').onkeypress = function (e) {
    if (!e) e = window.event;
    var keyCode = e.keyCode || e.which;
    if (keyCode == '13') {
      // Enter pressed
      processURLChange();
    }
  };

  // Is there a URL in the URL HASH?
  var streetURL = location.hash.substring(1);
  // console.log('hash check: ' + streetURL);

  if (streetURL) {
    var pathArray = new URL(streetURL).pathname.split('/');
    // optimistically try to convert from streetmix URL to api url
    if (pathArray[1] !== 'api') {
      streetURL = streetmixUserToAPI(streetURL);
    }
  } else { // DEFAULTS if no URL provided then here are some defaults to choose from:
    // LOCAL
    // var streetURL = 'sample.json';

    // REMOTE WITH REDIRECT:
    var streetURL = 'https://streetmix.net/api/v1/streets?namespacedId=3&creatorId=kfarr';
    window.location.hash = '#' + streetmixAPIToUser(streetURL);
    document.getElementById('input-url').value = streetmixAPIToUser(streetURL);
    return;
    // DIRECT TO REMOTE FILE: - don't use this since it's hard to convert back to user friendly URL
    // var streetURL = 'https://streetmix.net/api/v1/streets/7a633310-e598-11e6-80db-ebe3de713876';
  }

  // console.log('streetURL check: ' + streetURL);
  //  loadStreet(streetURL);
  document.querySelector('.set-from-input').setAttribute('street', 'streetmixURL: ' + streetURL + '; buildings: true;');

  // instead set street component to this value

  window.location.hash = '#' + streetmixAPIToUser(streetURL);
  document.getElementById('input-url').value = streetmixAPIToUser(streetURL);
}
window.onload = initStreet; // TODO: move somewhere else (maybe index.html)

// If URL Hash Changed load new street from this value
function locationHashChanged () {
  // check if valid hash
  // if yes, then clear old city // load new city with that hash
  var streetURL = location.hash.substring(1);
  // console.log('hash changed to: ' + streetURL);

  if (streetURL) {
    var pathArray = new URL(streetURL).pathname.split('/');
    // optimistically try to convert from streetmix URL to api url
    if (pathArray[1] !== 'api') {
      streetURL = streetmixUserToAPI(streetURL);
    }

    // loadStreet(streetURL);
    document.querySelector('.set-from-input').setAttribute('street', 'streetmixURL: ' + streetURL + '; buildings: true;');

    // update the user interface to show the new URL
    document.getElementById('input-url').value = streetmixAPIToUser(streetURL);
  }
}
window.onhashchange = locationHashChanged; // TODO: move somewhere else (maybe index.html)

// Load new street from input-url value
function processURLChange () {
  var streetURL = document.getElementById('input-url').value;
  // console.log('hash changed to: ' + streetURL);

  if (streetURL) {
    // for a given streetURL
    var pathArray = new URL(streetURL).pathname.split('/');
    // optimistically try to convert from streetmix URL to api url
    if (pathArray[1] !== 'api') {
      streetURL = streetmixUserToAPI(streetURL);
    }
    const isSame = (window.location.hash === '#' + streetmixAPIToUser(streetURL));
    window.location.hash = '#' + streetmixAPIToUser(streetURL);
    if (isSame) { locationHashChanged(); } // if identical, force run locationHashChanged function
  }
}
