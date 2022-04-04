import "./App.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Button, Card, ListGroup, Row, Col, Container } from "react-bootstrap";
import Weather from "./Weather";
import Movies from "./Movies";
// import placeholder from './placehold.jpeg'
import placeholderportrait from "./placeholder-portrait.png";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityData: {},
      weatherData: [],
      error: false,
      errorMessage: "",
      city: "",
      movieData: [],
      submitted: true,
      imgData: [],
      itunesData: [],
    };
  }

  handleCityInput = (e) => {
    this.setState({
      city: e.target.value,
    });
  };

  // Get our Data from Server API's
  getCityData = async (e) => {
    e.preventDefault();
    try {
      // Get the movie database json data from our server
      let movieData = await axios.get(
        `${process.env.REACT_APP_SERVER}/movies?city=${this.state.city}`
      );
      this.setState({ movieData: movieData.data }); // .data is built into axios

      let imgData = await axios.get(
        `${process.env.REACT_APP_SERVER}/imsea?q=${this.state.city}`
      );
      this.setState({ imgData: imgData.data[0] }); // .data is built into axios

      let itunesData = await axios.get(
        `${process.env.REACT_APP_SERVER}/itunes?term=${this.state.city}`
      );
      this.setState({ itunesData: itunesData.data }); // .data is built into axios

      // Get weatherbit json data from our server
      let weatherData = await axios.get(
        `${process.env.REACT_APP_SERVER}/weather?city=${this.state.city}`
      );
      this.setState({ weatherData: weatherData.data }); // .data is built into axios

      // get the data from the location iq API
      let cityData = await axios.get(
        `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`
      );
      this.setState({ cityData: cityData.data[0] }); // .data is built into axios

      this.setState({ submitted: false });
    } catch (error) {
      this.setState({
        error: true,
        errorMessage: `Error! Error: ${error.response.status}`,
      });
    }
  };

  renderImage = (imageUrl) => {
    return (
      <div>
        <img key="idx" alt="alt" src={imageUrl} />
      </div>
    );
  };
  render() {
    // console.log(this.state);

    let listItems = this.state.weatherData.map((element, idx) => {
      return (
        <ul
          style={{ listStyle: "none", marginTop: "20px" }}
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

    let listItemsMovies = this.state.movieData.map((element, idx) => {
      return (
        <Col className="h-100" key={idx}>
          <Card
            className="card text-center h-100"
            style={{
              width: "auto",
              height: "600px",
              padding: "10px",
              margin: "2rem",
            }}
          >
            <Card.Title style={{ height: "50px", overflow: "auto" }}>
              {element.title}
            </Card.Title>
            {element.posterPath ? (
              <Card.Img
                className="h-100"
                style={{ overflow: "auto" }}
                variant="top"
                src={`https://image.tmdb.org/t/p/w500/${element.posterPath}`}
                height="300px"
              />
            ) : (
              <Card.Img
                className="h-100"
                variant="top"
                src={placeholderportrait}
                height="900px"
              />
            )}
            <Card.Footer style={{ height: "40px", overflow: "auto" }}>
              {element.released}
            </Card.Footer>
          </Card>
        </Col>
      );
    });
    const removeDoubles = [...new Set(this.state.imgData)];
    let imgCards = removeDoubles.map((element, idx) => {
      return (
        <img
          style={{ width: 400, height: 250, padding: 20 }}
          key={idx}
          alt={idx}
          src={element}
        />
      );
    });
    let itunesList = this.state.itunesData.map((element, idx) => {
      return (
        <Col className="h-100" key={idx} style={{paddingTop: 15}} >

        <ul style={{padding: 5, flexDirection: 'row',textAlign: 'center', listStyle: "none" ,textAlign: "center"}}>
          <li
          style={{  width: 300 ,background:"grey"}}
          >
            {element.artistName}
          </li>
          <li
          style={{  width: 300 ,background:"grey"}}
          >
            {element.trackName}
          </li>
        </ul>
        </Col>
      );
    });
    console.log(this.state.itunesData);
    return (
      <>
        <h2 style={{ textAlign: "center", marginTop: "40px" }}>
          Welcome to City Explorer! {this.city}
        </h2>

        <header className="bg-dark text-white">
          <form onSubmit={this.getCityData}>
            <label>
              Pick a city:
              <input
                type="text"
                onInput={this.handleCityInput}
                placeholder="City Name"
              />
              <Button id="toggle" type="submit">
                Explore!
              </Button>
            </label>
          </form>
        </header>

        {this.state.error || this.state.submitted ? (
          <p>{this.state.errorMessage}</p>
        ) : (
          <ListGroup>
            <ListGroup.Item>
              {" "}
              City: {this.state.cityData.display_name}{" "}
            </ListGroup.Item>
            <ListGroup.Item>lat: {this.state.cityData.lat}</ListGroup.Item>
            <ListGroup.Item> lon: {this.state.cityData.lon}</ListGroup.Item>
            <ListGroup.Item>
              {" "}
              <img
                alt={this.state.cityData.display_name}
                src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=10&size=300x300&format=<format>&maptype=<MapType>&markers=icon:<icon>|${this.state.cityData.lat},${this.state.cityData.lon}&markers=icon:<icon>|<latitude>,<longitude>`}
              />
            </ListGroup.Item>
          </ListGroup>
        )}
        <footer>
          <Weather
            imgData={this.state.imgData}
            city={this.state.city}
            submitted={this.state.submitted}
            listItems={listItems}
            weatherData={this.state.weatherData}
            error={this.state.error}
            errorMessage={this.state.errorMessage}
            getCityData={this.getCityData}
          />
          {this.state.error || this.state.submitted ? (
            <p>{this.state.errorMessage}</p>
          ) : (
            <Container>
              <h2 style={{ textAlign: "center" }}>{this.state.city} images</h2>
              {imgCards}
            </Container>
          )}
          {this.state.error || this.state.submitted ? (
            <p>{this.state.errorMessage}</p>
          ) : (
            <div
              style={{
                display: "flex",
                backgroundImage: `url(${this.state.imgData[3]})`,
                backgroundSize: "100%",
                flexDirection: "row",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <h1 style={{ padding: 15, textAlign: "center", marginTop: "40px" }}>
                Song names containing {this.state.city}
              </h1>
              <Row xs = { 1} md = { 4} className = "h-100" >

              {itunesList}
              </Row>
            </div>
          )}
          <Movies
            city={this.state.city}
            submitted={this.state.submitted}
            error={this.state.error}
            errorMessage={this.state.errorMessage}
            getCityData={this.getCityData}
            listItemsMovies={listItemsMovies}
          />
        </footer>
      </>
    );
  }
}

export default App;
