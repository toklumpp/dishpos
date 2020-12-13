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
    document.getElementById('act_azimuth').innerHTML = Math.ceil(dir);
    // Rotate the disc of the compass. - CSS transform
    const compassDisc = document.getElementById('circle');
    compassDisc.style.transform = `rotate(${dir}deg)`;
    compassDisc.style.webkitTransform = `rotate(${dir}deg)`;
    compassDisc.style.MozTransform = `rotate(${dir}deg)`;
    const compassPointer = document.getElementById('pointer');
    compassPointer.style.transform = `rotate(document.getElementById('req_azimuth').innerHTML)`;
    compassPointer.style.webkitTransform = `rotate(document.getElementById('req_azimuth').innerHTML)`;
    compassPointer.style.MozTransform = `rotate(document.getElementById('req_azimuth').innerHTML)`;
  }

});

function recalculate() {
	var satpos = ((document.getElementById('satpos').value)*Math.PI/180)
	var longitude = ((document.getElementById('longitude').value)*Math.PI/180)
	var latitude = ((document.getElementById('latitude').value)*Math.PI/180)
	var difference = longitude - satpos
	var cos_angle = Math.cos(latitude) * Math.cos(difference)
	document.getElementById('act_elevation').innerHTML = cos_angle
	var angle = Math.acos(cos_angle);
	var cos_azimuth = -Math.tan(latitude)/Math.tan(angle)
	var tan_elevation = (cos_angle-0.151)/Math.sin(angle)
	var elevation = Math.atan(tan_elevation)
	var azimuth = Math.acos(cos_azimuth)
	if(difference > 0) {
		 azimuth = 2 * Math.PI - azimuth
	}
	document.getElementById('req_elevation').innerHTML = (elevation*180/Math.PI)
	document.getElementById('req_azimuth').innerHTML = (azimuth*180/Math.PI)
}