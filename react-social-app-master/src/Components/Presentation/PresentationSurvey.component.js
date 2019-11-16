import React from 'react';
import { Grid } from '@material-ui/core';
import PresentationCard from './PresentationCard.component';
import PresentationPageination from './PresentationPageination.component';
import LinearProgress from '@material-ui/core/LinearProgress';
import Poll from '@material-ui/icons/PieChart';
import Happy from '@material-ui/icons/SentimentVerySatisfied';
import Sad from '@material-ui/icons/SentimentDissatisfied';
import VerySad from '@material-ui/icons/SentimentVeryDissatisfied';



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

  renderCard2() {
    return (
      <div>
        <p><Sad style={{marginRight: 8, fontSize: 40}}/>sometimes (53,6%)</p>
        <LinearProgress
          style={{marginBottom: 20, height: 10}}
          variant="determinate"
          color="primary"
          value={100}
        />
        <p><VerySad style={{marginRight: 8, fontSize: 40}}/>often (33,5%)</p>
        <LinearProgress
          style={{marginBottom: 20, height: 10}}
          variant="determinate"
          color="primary"
          value={63}
        />
        <p><Happy style={{marginRight: 8, fontSize: 40}}/>never (12,8%)</p>
        <LinearProgress
          style={{height: 10}}
          variant="determinate"
          color="primary"
          value={24}
        />
      </div>
    );
  }

  renderCard() {
    return (
      <div>
        <Poll style={{marginRight: 8, fontSize: 30}}/>
        We asked 179 people a similar question:
      </div>
    );
  }

  renderCard3() {
    return (
      <em>
        Have you ever forgotten to contact or meet someone again even though you care about the person? 
      </em>
    );
  }

  render() {
    return (
      <div>
        <Grid container spacing={0} justify="space-around" alignItems="center">
          <Grid item xs={12} sm={5}>
              <PresentationCard
                size="h5"
                content={this.renderCard} 
                variant="pointingPercy" 
              />
              <PresentationCard
                size="h5"
                content={this.renderCard3} 
                variant="noPercy" 
              />
          </Grid>
          <Grid item xs={12} sm={5}>
              <PresentationCard
                size="h5"
                content={this.renderCard2} 
                variant="sadPercy" 
                color="secondary"
              />
          </Grid>
        </Grid>
        <PresentationPageination prev="question" next="research"/>
      </div>
    );
  }
}


export default Presentation;
