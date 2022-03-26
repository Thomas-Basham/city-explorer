import './App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import {  Button, Card, ListGroup, Col } from 'react-bootstrap';
import Weather from './Weather';
import Movies from './Movies';
class App extends React.Component{
  constructor(props){
  super(props);
    this.state={
      cityData: {},
      weatherData:[],
      error: false,
      errorMessage: '',
      city: '',
      movieData: []
  
    }
  }

  handleCityInput = (e) => {
    this.setState({
      city: e.target.value
    })
  }

// Get our Data from Server API's
  getCityData = async (e) => {
    e.preventDefault();
    try {
      // Get the movie database json data from our server
      let movieData = await axios.get(`${process.env.REACT_APP_SERVER}/movies?city=${this.state.city}`);
      this.setState({movieData: movieData.data})  // .data is built into axios

      // Get weatherbit json data from our server
      let weatherData = await axios.get(`${process.env.REACT_APP_SERVER}/weather?city=${this.state.city}`);
      this.setState({weatherData: weatherData.data})  // .data is built into axios

      // get the data from the location iq API
      let cityData = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`);
      this.setState({cityData: cityData.data[0]})  // .data is built into axios

      } catch (error) {
        this.setState({
          error: true,
          errorMessage: `Error! Error: ${error.response.status}`
        })
      }
    }
  
  render (){
    // console.log(this.state);

    let listItems = this.state.weatherData.map(
      (element, idx) => {
          return (
            
              <ul style={{listStyle: 'none', marginTop: '20px'}} key={idx} 
                  type="disc">
                  <li 
                  style={{ 
                  
                      fontWeight: 'bold', 
                      color: 'red' }}
                  >
                      {element.date}
                  </li>
                  <li>{element.description}</li>
              </ul>
            )
          }
        )

    let listItemsMovies = this.state.movieData.map(
      (element, idx) => {
          return (
            <Col className='h-100'>
                <Card 
                className="card text-center h-100"
                key={idx} 
                style={{ width: '16em', padding: '10px', margin: '2rem'}}
                >
                <Card.Title style={{height: '50px', overflow:'auto' }} >
                  {element.title}
                </Card.Title>

                <Card.Img 
                className="h-100"
                style={{ overflow:'auto' }}
                variant="top" 
                src={`https://image.tmdb.org/t/p/w500/${element.posterPath}`} // ? src=''  : src=''
                height="400px"
                />

                <Card.Footer style={{height: '40px', overflow:'auto' }}>
                  {element.released}
                </Card.Footer>
              </Card>
            </Col>
          )
        }
      )

    return (
    <>      
      <h2 style={{textAlign: 'center', marginTop:'40px' }}> Welcome to City Explorer! {this.city}</h2>

      <header className="bg-dark text-white">

        <form  onSubmit={this.getCityData}>
            <label>Pick a city:
              <input type="text" onInput={this.handleCityInput} placeholder='City Name'/>
              <Button id="toggle" type="submit">Explore!</Button>
            </label>
        </form>
      </header>

        {this.state.error 

          ?

          <p>{this.state.errorMessage}</p>

          :

          <ListGroup>
            
            <ListGroup.Item > City: {this.state.cityData.display_name} </ListGroup.Item> 
            <ListGroup.Item>lat: {this.state.cityData.lat}</ListGroup.Item> 
            <ListGroup.Item> lon: {this.state.cityData.lon}</ListGroup.Item> 
            <ListGroup.Item> <img alt={this.state.cityData.display_name} src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=10&size=300x300&format=<format>&maptype=<MapType>&markers=icon:<icon>|${this.state.cityData.lat},${this.state.cityData.lon}&markers=icon:<icon>|<latitude>,<longitude>`}/></ListGroup.Item>
          </ListGroup>
        } 
      <footer>

        <Weather
              listItems={listItems}
              weatherData={this.state.weatherData}
              error={this.state.error}
              errorMessage={this.state.errorMessage}
              getCityData={this.getCityData}
        />

        <Movies
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
