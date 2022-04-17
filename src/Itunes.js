import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";

export default class Itunes extends Component {
  render() {
    let itunesList = this.props.itunesData.map((element, idx) => {
      return (
        <Col
          className="h-100"
          key={idx}
          style={{ paddingTop: 15, width: "fit-content" }}
        >
          <ul
            className="tuneslist"
            style={{
              textAlign: "left",
              background: "grey",
              opacity: 0.8,
              borderRadius: 3,
              padding: 3,
              flexDirection: "row",
              listStyle: "none",
              height: "max-content",
            }}
          >
            <li>
              <strong> {element.trackName} </strong>
            </li>
            <li
              className="tuneslist"
              style={{ width: "fit-content", height: "max-content" }}
            >
              {element.artistName}
            </li>
          </ul>
        </Col>
      );
    });

    return (
      <>
        {this.props.error || this.props.submitted ? (
          <p>{this.props.errorMessage}</p>
        ) : (
          <>
            <h2 style={{ padding: 15, textAlign: "center", marginTop: "4vh" }}>
              Song names containing {this.props.city}
            </h2>
            <Row xs={1} s={2} md={4} className="h-100">
              {itunesList}
            </Row>
          </>
        )}
      </>
    );
  }
}
