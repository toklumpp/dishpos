document.addEventListener('DOMContentLoaded', handleEvent);

measuredValue = 0;
longitude = 0;
latitude = 0;

const options = { frequency: 60, referenceFrame: 'device' };
const sensor = new AbsoluteOrientationSensor(options);

sensor.addEventListener('reading', handleOrientationEvent);
sensor.addEventListener('error', error => {
  if (event.error.name == 'NotReadableError') {
    document.getElementById('notice-deviceorientation').innerHTML = "Sensor is not available.";
  }
});
sensor.start();

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
	document.getElementById('satpos').addEventListener("change", recalculate)
	document.getElementById('fetch_location').addEventListener("click", fetchLocation)
}
function fetchLocation() {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(handlePositionEvent);
	} else {
		document.getElementById('notice-geolocation').innerHTML = 'Your device does not support the geolocation API'
	}
}
function handleOrientationEvent() {
var result =sensor.quaternion;
 setOrientationData(calculateAzimuthFromQuaternion(result[0],result[1],result[2],result[3]))

}
function setOrientationData(angle) {
	measuredValue = angle;
	setActualAzimuth();

}

function handlePositionEvent(position) {
	latitude = position.coords.latitude
	longitude = position.coords.longitude
	document.getElementById('longitude').innerHTML = Number.parseFloat(longitude).toFixed(3);
	document.getElementById('latitude').innerHTML = Number.parseFloat(latitude).toFixed(3);
	recalculate();
	setActualAzimuth();
}


function setActualAzimuth() {
	var dir = 360 - measuredValue;
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
//gets the required angle for the azimuth from the quaternions
function calculateAzimuthFromQuaternion(w,x,y,z) {
    var sinr_cosp = 2 * (w * x + y * z);
    var cosr_cosp = 1 - 2 * (x * x + y * y);
    var roll = Math.atan2(sinr_cosp, cosr_cosp);
    return (roll  * 180 / Math.PI +360)%360;

}
function recalculate() {
	document.getElementById('req_elevation').innerHTML = Number.parseFloat(calculateElevation()).toFixed(2);
	document.getElementById('req_azimuth').innerHTML = Number.parseFloat(calculateAzimuth()).toFixed(2);
}