import "./App.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Button, Card, ListGroup, Row, Col, Container } from "react-bootstrap";
import Weather from "./Weather";
import Movies from "./Movies";
import Classnames from "classnames";
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
      songSelection: [],
      prevScrollpos: window.pageYOffset,
      visible: true
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
  getSongs = async () => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/song`;
      let songs = await axios.get(url);
      this.setState({
        songSelection: songs.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
  // componentDidMount() {
  //   this.getSongs();
  // }

  postSong = async (newSong) => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/song`;
      let createdSong = await axios.post(url, newSong);
      this.setState({
        songSelection: [...this.state.songSelection, createdSong.data],
      });
    } catch (error) {
      console.log("we have an error:", error.response.data);
    }
  };

  handleAddSong = (e) => {
    e.preventDefault();
    let newSong = {
      artist: this.state.itunesData[0].artistName,
      track: this.state.itunesData[0].trackName,
      artwork: this.state.itunesData[0].artWork,
      email: "bashamtg@gmail.com",
    };
    console.log(newSong);
    this.postSong(newSong);
  };

  // Adds an event listener when the component is mount.
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  // Remove the event listener when the component is unmount.
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  // Hide or show the menu.
  handleScroll = () => {
    const { prevScrollpos } = this.state;

    const currentScrollPos = window.pageYOffset;
    const visible = prevScrollpos > currentScrollPos;

    this.setState({
      prevScrollpos: currentScrollPos,
      visible
    });
  };
  render() {
    
    console.log(this.state.visible);
    let itunesList = this.state.itunesData.map((element, idx) => {
      return (
        <Col className="h-100" key={idx} style={{ paddingTop: 15, width: "fit-content" }}>
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

    let listItems = this.state.weatherData.map((element, idx) => {
      return (
        <ul
          style={{ listStyle: "none", textAlign: "center", marginInline: "auto", paddingInline: 0}}
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
    const removeDoubles = [...new Set(this.state.imgData)];
    let imgCards = removeDoubles.map((element, idx) => {
      return (
        <img
          style={{ width: 300, height: 300, padding: 20 }}
          key={idx}
          alt={idx}
          src={element}
        />
      );
    });

    console.log(this.state.itunesData);
    return (
      <>
        <header 
        style={{position:"sticky"}}
        className={ Classnames("navbar bg-dark  text-white", {"navbar--hidden ": !this.state.visible})} >
          {this.state.error || this.state.submitted ? (
            <p>{this.state.errorMessage}</p>
          ) : (
            <div className="col" id="map">
              <ListGroup>
                <ListGroup.Item>
                  {" "}
                  {this.state.cityData.display_name}{" "}
                </ListGroup.Item>
                <ListGroup.Item>
                  <img
                    id="mapImg"
                    alt={this.state.cityData.display_name}
                    src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=8size=300x300&format=<format>&maptype=<MapType>&markers=icon:<icon>|${this.state.cityData.lat},${this.state.cityData.lon}&markers=icon:<icon>|<latitude>,<longitude>`}
                  />
                  <p style={{ marginBottom: 0 }}>
                    lat: {this.state.cityData.lat}
                  </p>
                  <p style={{ marginBottom: 0 }}>
                    lon: {this.state.cityData.lon}
                  </p>
                </ListGroup.Item>
              </ListGroup>
            </div>
          )}
          <div className="col">
            {this.state.submitted === true ? (
              <h2 style={{ textAlign: "center", marginTop: "40px" }}>
                Welcome to City Explorer! {this.city}
              </h2>
            ) : (
              ""
            )}

            <form id="searchForm" onSubmit={this.getCityData}>
              <label>
                Pick a city
                <input
                  className="input-txt"
                  type="text"
                  onInput={this.handleCityInput}
                  placeholder="Search powered by WeatherBit™, LocationIQ™, ImSea™, Itunes™, IMDB™"
                />
                <Button variant="outline-primary" id="toggle" type="submit">
                  Explore!
                </Button>
              </label>
            </form>
          </div>
          <Weather
            className="col"
            imgData={this.state.imgData}
            city={this.state.city}
            submitted={this.state.submitted}
            listItems={listItems}
            weatherData={this.state.weatherData}
            error={this.state.error}
            errorMessage={this.state.errorMessage}
            getCityData={this.getCityData}
          />
        </header>

        <main>
          {this.state.error || this.state.submitted ? (
            <p>{this.state.errorMessage}</p>
          ) : (
            <Container
              id="itunes"
              style={{
                margin: 0,
                marginInline: "auto",
                paddingTop: 20,
                backgroundImage: `url(${this.state.imgData[3]})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                textAlign: "center",
              }}
            >
              <h2
                style={{ padding: 15, textAlign: "center", marginTop: "4vh" }}
              >
                Song names containing {this.state.city}
              </h2>
              <Row xs={1} s={2} md={4} className="h-100">
                {itunesList}
              </Row>
            </Container>
          )}

          {this.state.error || this.state.submitted ? (
            <p>{this.state.errorMessage}</p>
          ) : (
            <Container 
            style={{textAlign: "center"}}
            >
              <h2 style={{ textAlign: "center", marginTop: "20px", width: "80vw"}}>
                {" "}
                {this.state.city} images{" "}
              </h2>
              {imgCards}
            </Container>
          )}
          <Container>
            <Movies
              city={this.state.city}
              submitted={this.state.submitted}
              error={this.state.error}
              errorMessage={this.state.errorMessage}
              getCityData={this.getCityData}
              listItemsMovies={listItemsMovies}
            />
          </Container>
        </main>

        <footer></footer>
      </>
    );
  }
}

export default App;
