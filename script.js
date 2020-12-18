document.addEventListener('DOMContentLoaded', handleEvent);
calibrationValue = 0;
measuredValue = 0;
longitude = 0;
latitude = 0;

function handleEvent(event) {
	if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('sw.js').then(function(registration) {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}
	if (window.DeviceOrientationEvent) {
		window.addEventListener('deviceorientation', handleOrientationEvent, false);
	} else {
		document.getElementById('notice-deviceorientation').innerHTML = 'Your device does not support the device orientation API'
	}
	document.getElementById('satpos').addEventListener("change", recalculate)
	document.getElementById('calibrate').addEventListener("click", calibrate)
	document.getElementById('fetch_location').addEventListener("click", fetchLocation)
}
function fetchLocation() {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(handlePositionEvent);
	} else {
		document.getElementById('notice-geolocation').innerHTML = 'Your device does not support the geolocation API'
	}
}
function handleOrientationEvent(eventData) {
	measuredValue = eventData.alpha;
	setActualAzimuth()
}

function handlePositionEvent(position) {
	latitude = position.coords.latitude
	longitude = position.coords.longitude
	document.getElementById('longitude').innerHTML = Number.parseFloat(longitude).toFixed(3);
	document.getElementById('latitude').innerHTML = Number.parseFloat(latitude).toFixed(3);
	recalculate();
	setActualAzimuth();
}

function calibrate() {
	calibrationValue = measuredValue;
	setActualAzimuth();
}

function setActualAzimuth() {
	var dir = (calibrationValue - measuredValue + 360) % 360;
	document.getElementById('act_azimuth').innerHTML = Number.parseFloat(dir).toFixed(1);
	var degrees = calculateAzimuth() - dir
	document.getElementById('satpointer').style.transform = `rotate(${degrees}deg)`;
	document.getElementById('circle').style.transform = `rotate(${-dir}deg)`;
	recalculate();
}

function calculateAzimuth() {
	var satpos = ((document.getElementById('satpos').value) * Math.PI / 180)
	var longitudeRad = (longitude * Math.PI / 180)
	var latitudeRad = (latitude * Math.PI / 180)
	var difference = longitudeRad - satpos
	var cos_angle = Math.cos(latitudeRad) * Math.cos(difference)
	var angle = Math.acos(cos_angle);
	var cos_azimuth = -Math.tan(latitudeRad) / Math.tan(angle)
	var azimuth = Math.acos(cos_azimuth)
	if (difference > 0) {
		azimuth = 2 * Math.PI - azimuth
	}
	return azimuth * 180 / Math.PI
}

function calculateElevation() {
	var elevation_const = 0.151;
	var satpos = ((document.getElementById('satpos').value) * Math.PI / 180)
	var longitudeRad = (longitude * Math.PI / 180)
	var latitudeRad = (latitude * Math.PI / 180)
	var difference = longitudeRad - satpos
	var cos_angle = Math.cos(latitudeRad) * Math.cos(difference)
	var angle = Math.acos(cos_angle);
	var tan_elevation = (cos_angle - elevation_const) / Math.sin(angle)
	var elevation = Math.atan(tan_elevation)
	return elevation * 180 / Math.PI
}

function recalculate() {
	document.getElementById('req_elevation').innerHTML = Number.parseFloat(calculateElevation()).toFixed(2);
	document.getElementById('req_azimuth').innerHTML = Number.parseFloat(calculateAzimuth()).toFixed(2);
}