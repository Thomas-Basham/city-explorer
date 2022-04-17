import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";
export default class LocationIQ extends Component {
  render() {
    return (
      <>
        {this.props.error || this.props.submitted ? (
          <p>{this.props.errorMessage}</p>
        ) : (
          <div className="col" id="map">
            <ListGroup>
              <ListGroup.Item>
                {this.props.cityData.display_name}
              </ListGroup.Item>
              <ListGroup.Item>
                <img
                  id="mapImg"
                  alt={this.props.cityData.display_name}
                  src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.props.cityData.lat},${this.props.cityData.lon}&zoom=3size=400x400&format=<format>&maptype=<MapType>&markers=icon:<icon>|${this.props.cityData.lat},${this.props.cityData.lon}&markers=icon:<icon>|<latitude>,<longitude>`}
                />
                <p style={{ marginBottom: 0 }}>
                  lat: {this.props.cityData.lat}
                </p>
                <p style={{ marginBottom: 0 }}>
                  lon: {this.props.cityData.lon}
                </p>
              </ListGroup.Item>
            </ListGroup>
          </div>
        )}
      </>
    );
  }
}
