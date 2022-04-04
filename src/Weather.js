import React from 'react';
import './weather.css';

// import axios from 'axios';

// import { Container } from 'react-bootstrap';


class Weather extends React.Component {

 render() {

return(
  <>

    {this.props.error || this.props.submitted
      ?

      <p>{this.props.errorMessage}</p>

      :

      <div className='' style={{ backgroundImage: `url(${this.props.imgData[0]})`,
        backgroundSize: "100%", flexDirection: 'row', textAlign: 'center' }}> 
          <h1 style={{textAlign: 'center', marginTop:'40px' }}>Current weather forecast for {this.props.city}</h1>

      {this.props.listItems}

      </div>
    }
  </>
  )
 }
}

export default Weather;