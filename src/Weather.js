import React from "react";
import "./weather.css";

class Weather extends React.Component {
  render() {
    return (
      <>
        {this.props.error || this.props.submitted ? (
          <p>{this.props.errorMessage}</p>
        ) : (
          <div
            className="weather col"
            style={{
              backgroundImage: `url(${this.props.imgData[0]})`,
              backgroundSize: "cover",
              textAlign: "center",
              marginInline: "auto"
            }}
          >
            <h6>Current weather forecast for {this.props.city}</h6>

            {this.props.listItems}
          </div>
        )}
      </>
    );
  }
}

export default Weather;
