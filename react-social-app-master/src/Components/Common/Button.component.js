import React from 'react';
import Button from '@material-ui/core/Button';

export class StartButton extends React.Component {
  buttonClicked() {
    console.log('Button was clicked!');
  }

  render() {
    return (
      <Button variant="contained" onClick={this.buttonClicked}>
        {this.props.content}
      </Button>
    );
  }
}
