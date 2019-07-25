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

const marks = [
  { value: 0, label: '0' },
  { value: 20, label: '2' },
  { value: 37, label: '3' },
  { value: 54, label: '4' },
  { value: 56, label: '5' },
  { value: 60, label: '6' },
  { value: 64, label: '7' },
  { value: 72, label: '8' },
  { value: 74, label: '9' },
  { value: 88, label: '10' },
];

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
      step={null}
      marks={marks}
      onChange={handleChange}
      // marks
      valueLabelDisplay="on"
      aria-labelledby="range-slider"
      getAriaValueText={valuetext}
      valueLabelFormat={x => `${x}%`}
      {...rest}
    />
  );
}

export default withStyles(sliderStyle)(HighlightSlider);
