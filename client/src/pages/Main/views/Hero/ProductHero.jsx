import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import Grow from '@material-ui/core/Grow';
import Button from '../../components/Button';
import Typography from '../../components/Typography';
import ProductHeroLayout from './ProductHeroLayout';

const styles = makeStyles(theme => ({
  background: {
    backgroundColor: '#7fc7d9', // Average color of the background image.
    backgroundPosition: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 170,
    marginTop: 50,
  },
  loginButton: {
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
    borderWidth: 2,
  },
  loginButtonLeft: {
    [theme.breakpoints.up('sm')]: {
      marginRight: 10,
    },
    [theme.breakpoints.down('sm')]: {
      marginRight: 3,
      backgroundColor: theme.palette.primary.main,
    },
  },
  loginButtonRight: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: 10,
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: 3,
      backgroundColor: theme.palette.primary.main,
    },
  },
  loginButtonWrapper: {
    display: 'flex',
  },
  h3: {
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(8),
      width: 1024,
    },
    [theme.breakpoints.down('sm')]: {
      width: '210px',
      fontSize: 37,
    },
  },
  h3sub: {
    [theme.breakpoints.down('sm')]: {
      width: '300px',
      fontSize: 37,
    },
  },
  h5: {
    width: '250px',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      width: '500px',
      marginTop: theme.spacing(5),
    },
  },
  h6: {
    marginTop: theme.spacing(2),
    color: grey[500],
  },
  more: {
    marginTop: theme.spacing(2),
  },
}));

function ProductHero(props) {
  const {
    text, backgroundImage, isLogin, history,
  } = props;
  const classes = styles();

  // const [check] = React.useState(true);

  const handleClick = () => {
    // handle login Click
    history.push('/dashboard/main');
  };

  return (
    <ProductHeroLayout
      backgroundClassName={classes.background}
      backgroundImage={backgroundImage}
    >
      {/* Increase the network loading priority of the background image. */}
      <Grow in timeout={1500}>
        <Typography
          color="inherit"
          align="center"
          variant="h3"
          className={classes.h3}
        >
          {text.title}
        </Typography>
      </Grow>
      <Grow in timeout={1500}>
        <Typography
          className={classes.h3sub}
          color="inherit"
          align="center"
          variant="h3"
          marked="center"
          style={{ marginTop: 15 }}
        >
          {text.subTitle}
        </Typography>
      </Grow>
      <Grow in timeout={2500}>
        <Typography
          color="inherit"
          align="center"
          variant="subtitle2"
          className={classes.h5}
        >
          {text.body}
        </Typography>
      </Grow>
      {/* 로그인 / 대시보드로 이동 버튼 */}
      {isLogin ? (
        <Grow in timeout={2500}>
          <Button
            color="primary"
            variant="contained"
            size="large"
            className={classes.button}
            onClick={handleClick}
          >
          대시보드로 이동
          </Button>
        </Grow>
      ) : (

        <Grow in timeout={2500}>
          <div className={classes.loginButtonWrapper}>
            <Button
              color="primary"
              variant="outlined"
              className={
                classnames([classes.button], [classes.loginButton], [classes.loginButtonLeft])}
              onClick={() => handleClick('marketer')}
            >
              OnCut 이용하기
            </Button>
          </div>

        </Grow>

      )}

    </ProductHeroLayout>
  );
}

ProductHero.propTypes = {
  text: PropTypes.object,
  backgroundImage: PropTypes.string,
};

ProductHero.defaultProps = {
  backgroundImage: '',
  text: {
    title: '재미있는 컨텐츠는 어디에?',
    subTitle: 'ONCUT',
    body: 'OnCut은 채팅 로그 텍스트분석을 통한 하이라이트 지점을 찾아줍니다.',
  },
};

export default ProductHero;
