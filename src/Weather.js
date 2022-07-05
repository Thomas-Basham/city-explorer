import React from "react";
import "./weather.css";

class Weather extends React.Component {
  render() {
    let listItems = this.props.weatherData.map((element, idx) => {
      return (
        <ul
          style={{
            listStyle: "none",
            textAlign: "center",
            marginInline: "auto",
            paddingInline: 0,
            marginBottom: 0,
          }}
          key={idx}
          type="disc"
        >
          <li
            style={{
              fontWeight: "bold",
              color: "red",
            }}
          >
            {element.date}
          </li>

          <li>{element.description}</li>
        </ul>
      );
    });
    return (
      <>
        {this.props.error || this.props.weatherData.length < 1  ? (
          <p>{this.props.errorMessage}</p>
        ) : (
          <div
            className="weather col"
            style={{
              backgroundImage: `url(${this.props.imgData[0]})`,
              backgroundSize: "cover",
              textAlign: "center",
              marginInline: "auto",
            }}
          >
            <h6>Current weather forecast for {this.props.city}</h6>

            {listItems}
          </div>
        )}
      </>
    );
  }
}

export default Weather;
