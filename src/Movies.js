import React from "react";
import { Row, Col, Card } from "react-bootstrap";

class Movies extends React.Component {
  render() {
    let listItemsMovies = this.props.movieData.map((element, idx) => {
      return (
        <Col className="h-100" key={idx}>
          <Card
            className="card text-center h-100"
            style={{
              width: "auto",
              height: "50vh",
              padding: "10px",
              margin: "2rem",
            }}
          >
            <Card.Title style={{ height: "50px", overflow: "auto" }}>
              {element.title}
            </Card.Title>
            {element.posterPath ? (
              <Card.Img
                style={{ overflow: "auto" }}
                variant="top"
                src={`https://image.tmdb.org/t/p/w500/${element.posterPath}`}
              />
            ) : (
              <Card.Img
                variant="top"
                src="https://dummyimage.com/300x600.jpg?text=No%20Image%20Found"
                alt="image not available"
                height="400vmax"
              />
            )}
            <Card.Footer style={{ height: "53px", overflow: "auto" }}>
              {element.released}
            </Card.Footer>
          </Card>
        </Col>
      );
    });
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
              {listItemsMovies}
            </Row>
          </>
        )}
      </>
    );
  }
}

export default Movies;
