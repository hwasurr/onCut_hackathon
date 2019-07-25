import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Slider from '@material-ui/core/Slider';

const sliderStyle = theme => ({
  root: {
    color: '#00acc1',
    height: 8,
  },
  thumb: {
    height: 22,
    width: 25,
    backgroundColor: theme.palette.common.white,
    border: '2px solid currentColor',
    borderRadius: '0',
    marginTop: -6,
    marginLeft: -12,
    '&:focus,&:hover,&$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
    '& *': {
      fontSize: 5,
    },
  },
  mark: {
    backgroundColor: '#bfbfbf',
    height: 12,
    width: 1,
    marginTop: -10,
  },
  markActive: {
    backgroundColor: 'currentColor',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
});

function HighlightSlider(props) {
  const { ...rest } = props;
  const [value, setValue] = React.useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function valuetext(index) {
    return `${index} 번째 구간의 편집점`;
  }

  return (
    <Slider
      value={value}
      min={1}
      max={99}
      marks
      onChange={handleChange}
      // marks
      valueLabelDisplay="on"
      aria-labelledby="range-slider"
      getAriaValueText={valuetext}
      valueLabelFormat={x => `${x}구간`}
      {...rest}
    />
  );
}

export default withStyles(sliderStyle)(HighlightSlider);
