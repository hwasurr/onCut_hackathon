import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  formControl: {
    marginTop: theme.spacing(3),
    minWidth: 167,
  },
}));

export default function PercentageSelect() {
  const classes = useStyles();
  const [threshold, setThreshold] = React.useState(10);
  const [open, setOpen] = React.useState(false);

  function handleChange(event) {
    setThreshold(event.target.value);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleOpen() {
    setOpen(true);
  }

  return (
    <form autoComplete="off">
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="demo-controlled-open-select">포인트 개수 설정</InputLabel>
        <Select
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={threshold}
          onChange={handleChange}
          inputProps={{
            name: 'threshold',
            id: 'threshold-select',
          }}
        >
          <MenuItem value={10}>상위 10%</MenuItem>
          <MenuItem value={20}>상위 20%</MenuItem>
          <MenuItem value={30}>상위 30%</MenuItem>
          <MenuItem value={40}>상위 40%</MenuItem>
        </Select>
      </FormControl>
    </form>
  );
}
