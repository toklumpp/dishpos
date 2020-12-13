import React, { Component } from 'react';
import logo from './logo.svg';

class SatPosForm extends Component {
  constructor(props) {
    super(props);
    this.state = { azimuth: '', latitude: '', longitude: '', elevation: '', satpos: '' };
  }
  satPositionHandler = (event) => {
  	this.setState({satpos: event.target.value})
this.calculateValues(this.state.latitude, this.state.longitude, event.target.value)
  }
  longitudeHandler = (event) => {
  	this.setState({longitude: event.target.value})
  		this.calculateValues(this.state.latitude, event.target.value, this.state.satpos)
  }
   latitudeHandler = (event) => {
  	this.setState({latitude: event.target.value})
  	this.calculateValues(event.target.value, this.state.longitude, this.state.satpos)
  }
  calculateValues = (latitude, longitude, satpos) => {
    this.setState({azimuth: latitude});
    this.setState({elevation: longitude});
  }
  
  render() {
    return (
      <form>
      <h1>Satellite Positioner</h1>
      	<label for="satpos">Satellite position (+ for E, - for W):</label>
      <input
        type='text' id='satpos' name='satpos'
        onChange={this.satPositionHandler}
      /><br />
      	<label for="longitude">Longitude</label>
      <input
        type='text' id='longitude' name='longitude'
        onChange={this.longitudeHandler}
      /><br />
      <label for="latitude">Latitude</label>
      <input
        type='text' id='latitude' name='latitude'
        onChange={this.latitudeHandler}
      /><br />
      	<label>Satellite Position: {this.state.satpos}</label><br />
      	<label>Longitude: {this.state.longitude}</label><br />
      	<label>Latitude: {this.state.latitude}</label><br />
      	<label>Azimuth: {this.state.azimuth}</label><br />
      	<label>Elevation: {this.state.elevation}</label><br />
      	<label>Actual Azimuth: </label>
      </form>
    );
  }
}

export default SatPosForm;