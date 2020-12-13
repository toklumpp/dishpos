document.addEventListener('DOMContentLoaded', function(event) {

  if (window.DeviceOrientationEvent) {
    document.getElementById('notice').innerHTML = 'Working API detected';
    window.addEventListener('deviceorientation', (eventData) => {
      // gamma: Tilting the device from left to right. Tilting the device to the right will result in a positive value.
      const tiltLR = eventData.gamma;
      // beta: Tilting the device from the front to the back. Tilting the device to the front will result in a positive value.
      const tiltFB = eventData.beta;
      // alpha: The direction the compass of the device aims to in degrees.
      const dir = eventData.alpha
      // Call the function to use the data on the page.
      deviceOrientationHandler(tiltLR, tiltFB, dir);
    }, false);
  } else {
    document.getElementById('notice').innerHTML = 'No API detected'
  };

  function deviceOrientationHandler(tiltLR, tiltFB, dir) {
    document.getElementById('tiltLR').innerHTML = Math.ceil(tiltLR);
    document.getElementById('tiltFB').innerHTML = Math.ceil(tiltFB);
    document.getElementById('direction').innerHTML = Math.ceil(dir);
    // Rotate the disc of the compass. - CSS transform
    const compassDisc = document.getElementById('compassDiscImg');
    compassDisc.style.transform = `rotate(${dir}deg)`;
    compassDisc.style.webkitTransform = `rotate(${dir}deg)`;
    compassDisc.style.MozTransform = `rotate(${dir}deg)`;
  }

});
