import React from 'react';
import './weather.css';

// import axios from 'axios';

// import { Container } from 'react-bootstrap';


class Weather extends React.Component {

 render() {

return(
  <>
    {this.props.error 
      ?

      <p>{this.props.errorMessage}</p>

      :

      <div className='' style={{ flexDirection: 'row', textAlign: 'center' }}> 
          <h1 style={{textAlign: 'center', marginTop:'40px' }}>Current weather Forecast</h1>

      {this.props.listItems}

      </div>
    }
  </>
  )
 }
}

export default Weather;