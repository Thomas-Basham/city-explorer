import React, { Component } from "react";

export default class ImSea extends Component {
  render() {
    const removeDoubles = [...new Set(this.props.imgData)];
    let imgCards = removeDoubles.map((element, idx) => {
      return (
        <img
          style={{ width: 300, height: 300, padding: 20, borderRadius: "10px" }}
          key={idx}
          alt={idx}
          src={element}
        />
      );
    });
    return (
      <>
        {this.props.error || this.props.submitted ? (
          <p>{this.props.errorMessage}</p>
        ) : (
          <>
            <h2
              style={{
                textAlign: "center",
                marginTop: "20px",
                width: "80vw",
              }}
            >
              {" "}
              {this.props.city} images{" "}
            </h2>
            {imgCards}
          </>
        )}
      </>
    );
  }
}
