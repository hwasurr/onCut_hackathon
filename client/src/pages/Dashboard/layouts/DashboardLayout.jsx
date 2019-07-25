import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Switch, Route } from 'react-router-dom';

import Navbar from '../components/Navbars/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import allRoutes from '../routes';
import dashboardStyle from '../assets/jss/onad/layouts/dashboardStyle';
import logo from '../assets/img/main_logo.png';
import Footer from '../components/Footer/Footer';
import '../assets/css/onad.css';

const MarketerRoutes = ({ history, pannelRef }) => (
  <Switch>
    {allRoutes.oncut.map(prop => (
      <Route
        path={prop.layout + prop.path}
        component={() => <prop.component history={history} pannelRef={pannelRef} />}
        key={prop.name}
      />
    ))}
  </Switch>
);

const MarketerDashboard = ({
  classes, history, ...rest
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const mainPanel = useRef();

  useEffect(() => {
    mainPanel.current.scrollTop = 0;
    if (history.location.pathname === window.location.pathname) {
      if (mobileOpen) {
        setMobileOpen(false);
      }
    }
  }, [history.location, history.location.pathname, mobileOpen]);

  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={allRoutes.oncut}
        logoText="OnCut"
        color="info"
        logo={logo}
        open={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        {...rest}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        {/* ref="mainPanel" */}
        <Navbar
          routes={allRoutes.oncut}
          history={history}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />
        <div className={classes.content}>
          <div className={classes.container}>
            <MarketerRoutes history={history} pannelRef={mainPanel} />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

MarketerRoutes.propTypes = {
  history: PropTypes.object,
};

MarketerRoutes.defaultProps = {
  history: {},
};

MarketerDashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object,
};

MarketerDashboard.defaultProps = {
  history: {},
};

export default withStyles(dashboardStyle)(MarketerDashboard);
