// 라우터 아이콘 @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard';
import Person from '@material-ui/icons/Person';

// router
import DashboardPage from './views/Dashboard/Dashboard';
import UserProfile from './views/UserProfile/UserProfile';

const dashboardRoutes = {
  oncut: [
    {
      path: '/main',
      name: '대시 보드',
      icon: Dashboard,
      component: DashboardPage, // 마케터 대시보드 컴포넌트로 수정
      layout: '/dashboard',
    },
    {
      path: '/user',
      name: '계정 관리',
      icon: Person,
      component: UserProfile, // 마케터 대시보드 컴포넌트로 수정
      layout: '/dashboard',
    },
  ],
};

export default dashboardRoutes;
