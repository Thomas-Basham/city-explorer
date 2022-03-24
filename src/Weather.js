import React from 'react';
import './weather.css';

// import axios from 'axios';

import { Container } from 'react-bootstrap';


class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
    // error: false,
    // weatherData:{},
    // date: '',
    // description: ''
    }
  }

  //   getWeatherData = async (e) => {
  //   e.preventDefault();
  //   try {
   
  //   // get the data from the API
  //   let weatherData = await axios.get(`${process.env.REACT_APP_SERVER}/weather?searchQuery=seattle`);
  //   this.setState({weatherData: weatherData.data})  // .data is built into axios
  //   console.log(this.state);

  //   console.log(weatherData);
  // }

  //   catch (error) {
      
  //     // console.log('error', error);
  //     // console.log('error.response', error.response);
  //     this.setState({
  //       error: true,
  //       errorMessage: `Error! Error: ${error.response.status}`
  //     })
  //   }
  // }

 render() {
// 

return(
  <>
        {this.props.error 
          ?
          <p>{this.props.errorMessage}</p>

          :
    <Container className=''> 
          {this.props.listItems}

    </Container>
 }
  </>
)


 }




}



export default Weather;