import React from "react";
import { Row } from "react-bootstrap";

class Movies extends React.Component {
  render() {
    return (
      <>
        {this.props.error || this.props.submitted ? (
          <p>{this.props.errorMessage} </p>
        ) : (
          <>
            <h1 style={{ textAlign: "center", marginTop: "40px" }}>
              {" "}
              Movies containing {this.props.city}{" "}
            </h1>
            <Row xs={1} sm={2} md={3} lg={4} className="h-100">
              {this.props.listItemsMovies}
            </Row>
          </>
        )}
      </>
    );
  }
}

// class Movie extends Movies.Component{

// }

export default Movies;
