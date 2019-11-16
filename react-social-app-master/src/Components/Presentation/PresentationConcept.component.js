import React from 'react';
import { Grid } from '@material-ui/core';
import PresentationCard from './PresentationCard.component';
import PresentationPageination from './PresentationPageination.component';
import MobileFriendly from'@material-ui/icons/MobileFriendly';


class Presentation extends React.Component {

  _detectArrowKeyPresses = (event) => { 
    switch (event.keyCode) {
      case 37:
        console.log('Prev key pressed');
        document.getElementById("prev-button").click();
        break;
      case 39:
        console.log('Next key pressed');
        document.getElementById("next-button").click();
        break;
    }
  };

  componentDidMount(){
    document.addEventListener("keydown", this._detectArrowKeyPresses);
  };

  componentWillUnmount() {
    document.removeEventListener("keydown", this._detectArrowKeyPresses);
  };

  renderCard() {
    return (
      <div>
        <p>Concept</p>
        <Grid container spacing={8} justify="center" alignItems="center">
          <Grid item>
            <MobileFriendly style={{ fontSize: 200,}} />
          </Grid>
        </Grid>
      </div>
    );
  }

  render() {
    return (
      <div>
        <Grid container spacing={0} justify="center" alignItems="center">
          <Grid item xs={12} sm={6}>
              <PresentationCard
                style={{marginTop: -20}}
                size="h4"
                content={this.renderCard} 
                variant="percy" 
              />
          </Grid>
        </Grid>
        <PresentationPageination prev="idea" next="tech"/>
      </div>
    );
  }
}


export default Presentation;
