import React from 'react';
import { Button } from 'react-bootstrap';

class AddSongButton extends React.Component{
  handleAddSong = (e) => {
    e.preventDefault();
    let newSong = {
      artist: this.props.artistName,
      track: this.props.trackName,
      artwork: this.props.artWork,
      email: "bashamtg@gmail.com"  
    }
    console.log(newSong);
    this.props.postSong(newSong);
  }

  render(){

    return (
        <Button variant="danger" onClick={this.handleAddSong}>Add Song</Button>
      
    ) 
  }
}

export default AddSongButton;