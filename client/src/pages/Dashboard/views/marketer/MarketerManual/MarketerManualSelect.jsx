import React from 'react';
import shortid from 'shortid';
// core ../../../components
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
// icons
// customized components
import Card from '../../../components/Card/Card';
import CardHeader from '../../../components/Card/CardHeader';
// style and images
import dashboardStyle from '../../../assets/jss/onad/views/dashboardStyle';
import clip from '../../../assets/img/clip.svg';
import graph from '../../../assets/img/graph.svg';
import broadcasting from '../../../assets/img/broadcasting.svg';

const useButtonStyle = makeStyles({
  root: {
    background: 'white',
    borderRadius: 3,
    border: 0,
    color: 'black',
    padding: '0 30px',
    boxShadow: '0 3px 3px 2px rgba(102, 102, 102, .3)',
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  label: {
    textTransform: 'capitalize',
    flexDirection: 'column',
  },
});

const sources = [
  {
    icon: clip,
    label: '광고 등록',
  },
  {
    icon: broadcasting,
    label: '승인된 배너 송출',
  },
  {
    icon: graph,
    label: '광고 성과차트',
  },
];

const Select = (props) => {
  const { classes, activeStep, handleButton } = props;
  const buttonClasses = useButtonStyle();
  const doneIndex = activeStep - 1;

  return (
    <Card>
      <CardHeader color="blueGray" stats>
        <h4 className={classes.cardTitleWhite}>
          이용 안내
        </h4>
        <p className={classes.cardCategoryWhite}>처음이시라면, 순서대로 진행해주세요.</p>
      </CardHeader>

      <Stepper orientation="vertical" activeStep={doneIndex}>
        {sources.map((source, index) => (
          <Step key={shortid.generate()}>
            <StepLabel>

              <Button
                size="large"
                variant="outlined"
                classes={{
                  root: buttonClasses.root, // class name, e.g. `classes-nesting-root-x`
                  label: buttonClasses.label, // class name, e.g. `classes-nesting-label-x`
                }}
                onClick={() => handleButton(index + 1)}
              >
                <img src={source.icon} alt="" style={{ marginTop: 10 }} />
                <p>{source.label}</p>
              </Button>
            </StepLabel>
          </Step>
        ))}

      </Stepper>

    </Card>
  );
};

export default withStyles(dashboardStyle)(Select);
