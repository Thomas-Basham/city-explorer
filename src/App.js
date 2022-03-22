import './App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

class App extends React.Component{
  constructor(props){
  super(props);
    this.state={
      cityData: {},

    }
  }

  handleCityInput = (e) => {
    this.setState({
      city: e.target.value
    })
  }

  getCityData = async (e) => {
    e.preventDefault();
    // get the data from the API
    let cityData = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`);
    this.setState({cityData: cityData.data[0]})
    console.log(this.state);

    // console.log(cityData.data[0]);
  
    console.log('LON/LAT INSIDE getCityData ' + cityData.data[0].boundingbox[0],cityData.data[0].boundingbox[2] );

  }
  
  
  
  
  
  render (){
    // console.log(this.state.cityData.data[0].boundingbox[0],this.state.cityData.data[0].boundingbox[2] )
    
    // console.log(this.state);
    // let cityDataLon = <li>(this.cityData.data[0].boundingbox[0],this.cityData.data[0].boundingbox[2]) <li/>
    // console.log(this.state.cityData.display_name);
    return (
    <>

      <header>
      <form onSubmit={this.getCityData}>
          <label>Pick a city:
            <input type="text" onInput={this.handleCityInput} />
            <button type="submit">Explore!</button>
          </label>
        </form>
      </header>

      <div>

            {this.state.cityData.display_name === "" ? undefined: <li> City: {this.state.cityData.display_name} </li> }
          
          <li> lat: {this.state.cityData.lat}</li>
        <li>lon!: {this.state.cityData.lon}</li>
       
 
      </div>
    
    </>
    );
  }
}

export default App;
