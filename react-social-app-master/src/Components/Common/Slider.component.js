import React from 'react';
import Slider from '@material-ui/lab/Slider';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';

const StyledSlider = withStyles({
  root: {
    color: '#fff',
    margin: 16,
    height: 4,
  },
})(Slider);

/**
 * Simple slider Component
 * @param {object} props
 * @param {Number} props.min - minimum value
 * @param {Number} props.max - maximum value
 * @param {string} props.minText - (optional) text to display as minimum
 * @param {string} props.maxText - (optional) text to display as maximum
 * @param {Number} props.value - the current slieder position value
 * @param {function} props.handleChange - function to be called onChange
 */
class CustomSlider extends React.Component {
  render() {
    return (
      <div className={'custom-slider ' + this.props.className}>
        <Typography
          hidden={!this.props.title}
          variant="overline"
          id="discrete-slider"
          gutterBottom
        >
          {this.props.title}
        </Typography>
        <StyledSlider
          defaultValue={this.props.default}
          value={this.props.value}
          aria-labelledby="discrete-slider"
          getAriaValueText={() => 'jolo'}
          valueLabelDisplay={this.props.valueLabelDisplay}
          valueLabelFormat={this.props.valueLabelFormat}
          marks={this.props.marks}
          min={this.props.min}
          max={this.props.max}
          onChange={this.props.handleChange}
        />
      </div>
    );
  }
}

export default CustomSlider;
