import React, { Component } from "react";

export default class ImSea extends Component {
  render() {
    const removeDoubles = [...new Set(this.props.imgData)];
    const sliceArray = removeDoubles.slice(0,10)
    let imgCards = sliceArray.map((element, idx) => {
      return (

        <a className="col" key={idx} href={element} target="_blank" rel="noopener noreferrer">
        <img

          style={{ width: 320, height: 210, padding: 20, borderRadius: "10px" }}
          
          alt={idx}
          src={element}
        />
        </a>
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
                marginTop: "2vh",
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
