import './App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';

class App extends React.Component{
  constructor(props){
  super(props);
    this.state={
      cityData: {},
      error: false,
      errorMessage: ''
    }
  }

  handleCityInput = (e) => {
    this.setState({
      city: e.target.value
    })
  }

  getCityData = async (e) => {
    e.preventDefault();
    try {

    // get the data from the API
    let cityData = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`);
    this.setState({cityData: cityData.data[0]})
    console.log(this.state);

    } catch (error) {
      // console.log('error', error);
      // console.log('error.response', error.response);
      this.setState({
        error: true,
        errorMessage: `An error occurred: ${error.response.status}`
      })
    }

    // console.log(cityData.data[0]);
  
    // console.log('LON/LAT INSIDE getCityData ' + cityData.data[0].boundingbox[0],cityData.data[0].boundingbox[2] );

    // let cityDataMap = await axios.get(`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=12&size=<width>x<height>&format=<format>&maptype=<MapType>`)
  };
  
  
  render (){
    // console.log(this.state.cityData.data[0].boundingbox[0],this.state.cityData.data[0].boundingbox[2] )
    
    // console.log(this.state);
    // let cityDataLon = <li>(this.cityData.data[0].boundingbox[0],this.cityData.data[0].boundingbox[2]) <li/>
    // console.log(this.state.cityData.display_name);
    return (
    <>

      <header className="bg-dark text-white">
      <form  onSubmit={this.getCityData}>
          <label>Pick a city:
            <input type="text" onInput={this.handleCityInput} placeholder='City Name'/>
            <Button type="submit">Explore!</Button>
          </label>
        </form>
      </header>
      
      {this.state.error 
          ?
          <p>{this.state.errorMessage}</p>

          :


          <ListGroup>

        {this.state.cityData === "" ? undefined : <ListGroup.Item > City: {this.state.cityData.display_name} </ListGroup.Item> }
        <ListGroup.Item>lat: {this.state.cityData.lat}</ListGroup.Item> 
        <ListGroup.Item> lon: {this.state.cityData.lon}</ListGroup.Item> 
        <ListGroup.Item> <img alt={this.state.cityData.display_name} src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=12&size=300x300&format=<format>&maptype=<MapType>&markers=icon:<icon>|${this.state.cityData.lat},${this.state.cityData.lon}&markers=icon:<icon>|<latitude>,<longitude>`}/></ListGroup.Item>
       
        </ListGroup>

      } 
      <footer></footer>
    </>
    );
  }
}

export default App;
