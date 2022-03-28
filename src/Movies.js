import React from 'react';
// import './movies.css';
import { Container, Row } from 'react-bootstrap';




class Movies extends React.Component{

render(){


return(
  <>
  {this.props.error || this.props.submitted

    ?

    <p>{ this.props.errorMessage } </p>

    :

    <Container>

      <h1 style={ { textAlign: 'center', marginTop: '40px' } }> Movies containing city name { this.city } </h1>
      <Row xs = { 1} md = { 4} className = "h-100" >

        { this.props.listItemsMovies }
        </Row>
    </Container>
  }
  </>

)
}
}

// class Movie extends Movies.Component{


// }


export default Movies;

