import "./App.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Button, Container } from "react-bootstrap";
import Weather from "./Weather";
import Movies from "./Movies";
import Classnames from "classnames";
import Itunes from "./Itunes";
import ImSea from "./ImSea";
import LocationIQ from "./LocationIQ";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      submitted: true,

      cityData: {},
      weatherData: [],
      movieData: [],
      imgData: [],
      itunesData: [],

      error: false,
      errorMessage: "",

      prevScrollpos: window.pageYOffset,
      visible: true,
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
      visible,
    });
  };
  render() {
    return (
      <>
        <header
          style={{ position: "sticky" }}
          className={Classnames("navbar bg-dark  text-white", {
            "navbar--hidden ": !this.state.visible,
          })}
        >
          <LocationIQ
            city={this.state.city}
            submitted={this.state.submitted}
            error={this.state.error}
            errorMessage={this.state.errorMessage}
            cityData={this.state.cityData}
          />

          <div className="col">
            {this.state.submitted === true 
            ? (
              <h2 style={{ textAlign: "center", marginTop: "40px" }}>
                Welcome to City Explorer! {this.city}
              </h2>
            ) 
            : (
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
            weatherData={this.state.weatherData}
            error={this.state.error}
            errorMessage={this.state.errorMessage}
            getCityData={this.getCityData}
          />
        </header>

        <main>
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
            <Itunes
              itunesData={this.state.itunesData}
              city={this.state.city}
              submitted={this.state.submitted}
              error={this.state.error}
              errorMessage={this.state.errorMessage}
            />
          </Container>

          <Container style={{ textAlign: "center" }}>
            <ImSea
              imgData={this.state.imgData}
              city={this.state.city}
              submitted={this.state.submitted}
              error={this.state.error}
              errorMessage={this.state.errorMessage}
            />
          </Container>

          <Container>
            <Movies
              movieData={this.state.movieData}
              city={this.state.city}
              submitted={this.state.submitted}
              error={this.state.error}
              errorMessage={this.state.errorMessage}
              getCityData={this.getCityData}
            />
          </Container>
        </main>

        <footer></footer>
      </>
    );
  }
}

export default App;
