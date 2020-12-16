document.addEventListener('DOMContentLoaded', handleEvent);
function handleEvent(event) {
	if (window.DeviceOrientationEvent) {
		document.getElementById('notice').innerHTML = '';
		window.addEventListener('deviceorientation', (eventData) => {
			setActualAzimuth(eventData.alpha)
    		}, false);
	} else {
    		document.getElementById('notice').innerHTML = document.getElementById('notice').innerHTML+'Your device does not support the compass API'
  	}
if ("geolocation" in navigator) {
  /* geolocation funktioniert */
} else {
 document.getElementById('notice').innerHTML = document.getElementById('notice').innerHTML+'Your device does not support the geolocation API'
}

}
 

  function setActualAzimuth(dir) {
       document.getElementById('act_azimuth').innerHTML = Math.ceil(dir);
	rotateSat(dir);
	rotateCircle(dir);
  }

function rotateSat(dir) {
	var degrees = dir + calculateAzimuth()
    document.getElementById('satpointer').style.transform = `rotate(${degrees}deg)`;
}
function rotateCircle(dir) {
    document.getElementById('circle').style.transform = `rotate(${dir}deg)`;
}

function calculateAzimuth() {
	var satpos = ((document.getElementById('satpos').value)*Math.PI/180)
	var longitude = ((document.getElementById('longitude').value)*Math.PI/180)
	var latitude = ((document.getElementById('latitude').value)*Math.PI/180)
	var difference = longitude - satpos
	var cos_angle = Math.cos(latitude) * Math.cos(difference)
	var angle = Math.acos(cos_angle);
	var cos_azimuth = -Math.tan(latitude)/Math.tan(angle)
	var azimuth = Math.acos(cos_azimuth)
	if(difference > 0) {
		 azimuth = 2 * Math.PI - azimuth
	}
	return azimuth*180/Math.PI
}

function calculateElevation() {
	var satpos = ((document.getElementById('satpos').value)*Math.PI/180)
	var longitude = ((document.getElementById('longitude').value)*Math.PI/180)
	var latitude = ((document.getElementById('latitude').value)*Math.PI/180)
	var difference = longitude - satpos
	var cos_angle = Math.cos(latitude) * Math.cos(difference)
	var angle = Math.acos(cos_angle);
	var tan_elevation = (cos_angle-0.151)/Math.sin(angle)
	var elevation = Math.atan(tan_elevation)
	return elevation*180/Math.PI
}
function recalculate() {
	document.getElementById('req_elevation').innerHTML = calculateElevation()
	document.getElementById('req_azimuth').innerHTML = calculateAzimuth()
}
