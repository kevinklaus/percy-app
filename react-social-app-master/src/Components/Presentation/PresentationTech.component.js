import React from 'react';
import { Grid } from '@material-ui/core';
import PresentationCard from './PresentationCard.component';
import PresentationPageination from './PresentationPageination.component';
import WifiOff from '@material-ui/icons/WifiOff';
import Public from '@material-ui/icons/Public';
import PermDeviceInformation from '@material-ui/icons/PermDeviceInformation';
import Devices from '@material-ui/icons/Devices';


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
        <p>Progressive Web Application!?</p>
        <Grid container justify="center" alignItems="center">
          <Grid item>
            <WifiOff style={{ fontSize: 150,}} />
          </Grid>
        </Grid>
      </div>
    );
  }

  renderCard2() {
    return (
      <div>
        <Grid container justify="space-around" alignItems="center">
          <Grid item>
            <Public style={{ fontSize: 80,}} />
          </Grid>
          <Grid item>
            <Devices style={{ fontSize: 80,}} />
          </Grid>
          <Grid item>
            <PermDeviceInformation style={{ fontSize: 80,}} />
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
              size="h4"
              content={this.renderCard} 
              variant="pointingPercy" 
            />
          </Grid>
        </Grid>
        <Grid container spacing={0} justify="center" alignItems="center">
          <Grid item xs={12} sm={6}>
            <PresentationCard
              size="h4"
              content={this.renderCard2} 
              variant="noPercy" 
              color="secondary"
            />
          </Grid>
        </Grid>
        <PresentationPageination prev="concept" next="percy"/>
      </div>
    );
  }
}


export default Presentation;
