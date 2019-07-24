import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { blueGrey } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import AppBar from '../../components/AppBar';
import Toolbar from '../../components/Toolbar';

const styles = theme => ({
  root: {
    backgroundColor: blueGrey[900],
  },
  title: {
    fontSize: 24,
  },
  toolbar: {
    justifyContent: 'space-between',
  },
  left: {
    flex: 0,
  },
  rightDesktop: {
    flex: 1,
    display: 'none',
    justifyContent: 'flex-end',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  rightMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  rightLink: {
    color: theme.palette.common.black,
    fontWeight: theme.typography.fontWeightRegular,
    marginLeft: 0,
    fontSize: 16,
    borderRadius: 0,
    [theme.breakpoints.up('md')]: {
      color: theme.palette.common.white,
      marginLeft: theme.spacing(3),
      '&:hover': {
        fontWeight: 'bold',
      },
    },
  },
  coloredLink: {
    color: theme.palette.primary.main,
  },
  active: {
    fontWeight: theme.typography.fontWeightMedium,
    borderBottom: '1.2px solid',
    borderBottomColor: theme.palette.primary.main,
  },
  buttonIcon: {
    marginRight: 10,
  },
});

function AppAppBar(props) {
  const {
    classes, history, isLogin, logout,
  } = props;

  // 대시보드로 이동 버튼 클릭
  const handleClick = () => {
    history.push('/dashboard');
  };

  const LogButton = () => {
    if (isLogin) {
      return (
        <Button
          className={classes.rightLink}
          color="inherit"
          onClick={logout}
        >
        로그아웃
        </Button>
      );
    }
    return (
      <Button
        className={classes.rightLink}
        color="inherit"
        onClick={logout}
      >
        로그인
      </Button>
    );
  };

  const RegButton = () => {
    if (isLogin) {
      return (
        <Button
          className={classNames(classes.rightLink, classes.coloredLink)}
          onClick={handleClick}
        >
        대시보드이동
        </Button>
      );
    }
    return (
      <Button
        className={classNames(classes.rightLink, classes.coloredLink)}
        onClick={handleClick}
      >
        회원가입
      </Button>
    );
  };

  return (
    <div>
      <AppBar className={classes.root} position="fixed">
        <Toolbar className={classes.toolbar}>
          <div className={classes.left} />
          <Button
            color="inherit"
            className={classes.title}
            component={Link}
            to="/"
          >
            {'OnAD'}
          </Button>

          <div className={classes.rightDesktop}>
            <LogButton history={history} logout={logout} />
            <RegButton history={history} logout={logout} />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

AppAppBar.propTypes = {
  classes: PropTypes.object,
};

AppAppBar.defaultProps = {
  classes: {},
};


export default withStyles(styles)(AppAppBar);
