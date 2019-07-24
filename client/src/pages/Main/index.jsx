import React, { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import AppAppBar from './views/Layout/AppAppBar';
import AppFooter from './views/Layout/AppFooter';
import ProductHero from './views/Hero/ProductHero';
import ProductCategories from './views/Categories/ProductCategories';
import withRoot from './withRoot';
import HOST from '../../config';

const heroInfo = {
  backImage: '/pngs/main_image.jpg',
};

const useLoginValue = (history, location) => {
  const [isLogin, setisLogin] = useState(false);
  const [repasswordOpen, setRepassword] = useState(false);

  // logout function
  const logout = () => {
    setisLogin(false);
    axios.get(`${HOST}/api/login/logout`)
      .then(() => {
        history.push('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios.get(`${HOST}/api/login/check`)
      .then((res) => {
        if (!res.data.error) {
          if (res.data.state) {
            // 임시 로그인되었습니다.
            console.log('임시로그인 되었습니다.');
            setRepassword(true);
          }
          setisLogin(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return {
    isLogin, repasswordOpen, logout, setRepassword,
  };
};

export default withRoot((props) => {
  // if located here, set the scroll to top of the page
  const { history, location } = props;
  const {
    isLogin, logout,
  } = useLoginValue(history, location);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div>
      <AppAppBar history={history} isLogin={isLogin} logout={logout} />
      <ProductHero backgroundImage={heroInfo.backImage} isLogin={isLogin} history={history} />
      <ProductCategories history={history} />
      {/* 문의받기 섹션, 오픈베타에 추가 */
          /* <ProductCTA /> */}
      <AppFooter history={history} />
    </div>
  );
});
