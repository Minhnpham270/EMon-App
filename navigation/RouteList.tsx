import { CalendarScreen } from '../screens/CalendarScreen';
import { SignupScreen } from '../screens/SignupScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { ReportScreen } from '../screens/ReportScreen';
import OtherScreen from '../screens/OtherScreen';
import ReportYearScreen from '../screens/OtherScreen/ReportYearScreen';
import ReportCategoryScreen from '../screens/OtherScreen/ReportCategoryScreen';
import DetailReportCategoryScreen from '../screens/OtherScreen/DetailReportCategoryScreen';
import ReportTotalScreen from '../screens/OtherScreen/ReportTotalScreen';
import { SearchScreen } from '../screens/SearchScreen';
import { SigninScreen } from '../screens/SigninScreen';

export enum IconBottom {
  HOME = 'Home',
  CALENDAR = 'Calendar',
  CHART = 'Chart',
  THREEDOTS = 'Threedots',
}

const routes: any[] = [
  {
    component: HomeScreen,
    name: 'Home',
    title: 'Home',
    isAuth: false,
    isBottom: true,
    icon: IconBottom.HOME,
  },
  {
    component: CalendarScreen,
    name: 'Calendar',
    title: 'Calendar',
    isAuth: false,
    isBottom: true,
    icon: IconBottom.CALENDAR,
  },
  {
    component: ReportScreen,
    name: 'Report',
    title: 'Report',
    isAuth: false,
    isBottom: true,
    icon: IconBottom.CHART,
  },
  {
    component: OtherScreen,
    name: 'Other',
    title: 'Khác',
    isBottom: true,
    icon: IconBottom.THREEDOTS,
  },
  {
    component: ReportYearScreen,
    name: 'ReportYear',
    title: 'Báo cáo năm',
    isAuth: false,
    isBottom: false,
  },
  {
    component: ReportCategoryScreen,
    name: 'ReportCategory',
    title: 'Báo cáo danh mục trong năm',
    isAuth: false,
    isBottom: false,
  },
  {
    component: DetailReportCategoryScreen,
    name: 'DetailReportCategory',
    title: 'Báo cáo toàn kì',
    isAuth: false,
    isBottom: false,
  },
  {
    component: ReportTotalScreen,
    name: 'ReportTotalYearTotal',
    title: 'Báo cáo danh mục toàn kì',
    isAuth: false,
    isBottom: false,
  },
  {
    component: SearchScreen,
    name: 'SearchRoute',
    title: 'Tìm kiếm',
    isAuth: false,
    isBottom: false,
  },
  {
    component: SignupScreen,
    name: 'Signup',
    title: 'Signup',
    isAuth: false,
  },
  {
    component: SigninScreen,
    name: 'SignIn',
    title: 'SignIn',
    isAuth: false,
  },
];

export default routes;
