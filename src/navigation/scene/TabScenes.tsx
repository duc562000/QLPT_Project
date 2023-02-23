import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import EditRoomScreen from 'feature/home/RoomManager/EditRoomScreen';
// import Images from 'assets/images';
// import AccountScreen from 'feature/account/AccountScreen';
import HomeDataScreen from 'feature/home/HomeDataScreen';
import HomeDetailScreen from 'feature/home/HomeDetailScreen';
// Screen
import HomeScreen from 'feature/home/HomeScreen';
import HomeUserListScreen from 'feature/home/HomeUserListScreen';
import ManagerScreen from 'feature/home/Room/ManagerScreen';
// import NotificationScreen from 'feature/notification/NotificationScreen';
// import SettingView from 'feature/setting/SettingScreen';
import StyledTabBar from 'navigation/components/StyledTabBar';
import navigationConfigs, { tabScreenOptions } from 'navigation/config/options';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import React from 'react';
import AddRoomScreen from 'feature/home/RoomManager/AddRoomScreen';
import MangerRoommer from 'feature/home/Rommer/MangerRoommer';
import EditRoomer from 'feature/home/Rommer/EditRoomer';
import ManagerBill from 'feature/home/Bill/ManagerBill';
import EditBill from 'feature/home/Bill/EditBill';
import SettingScreen from 'feature/home/Settting/SettingScreen';
import Images from 'assets/images';
// import { useTranslation } from 'react-i18next';

const MainStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

const HomeStack = () => (
    <MainStack.Navigator screenOptions={navigationConfigs}>
        <MainStack.Screen name={TAB_NAVIGATION_ROOT.HOME_ROUTE.HOME} component={HomeScreen} />
        <MainStack.Screen name={TAB_NAVIGATION_ROOT.HOME_ROUTE.HOME_DETAIL} component={HomeDetailScreen} />
    </MainStack.Navigator>
);

const MainTabContainer = () => {
    // const { t } = useTranslation();
    const ArrayTabs = [
        {
            name: TAB_NAVIGATION_ROOT.HOME_ROUTE.ROOT,
            // title: 'Trang chủ',
            component: HomeStack,
            // icon: Images.icons.tab.home,
        },
        // {
        //     name: TAB_NAVIGATION_ROOT.NOTIFICATION_ROUTE.ROOT,
        //     title: t('tab.notification'),
        //     component: NotificationScreen,
        //     icon: Images.icons.tab.notification,
        // },
        // {
        //     name: TAB_NAVIGATION_ROOT.SETTING_ROUTE.ROOT,
        //     title: t('tab.setting'),
        //     component: SettingView,
        //     icon: Images.icons.tab.setting,
        // },
        // {
        //     name: TAB_NAVIGATION_ROOT.ACCOUNT_ROUTE.ROOT,
        //     title: t('tab.account'),
        //     component: AccountScreen,
        //     icon: Images.icons.tab.account,
        // },
    ];
    return (
        <MainTab.Navigator
            screenOptions={tabScreenOptions}
            tabBar={(props: BottomTabBarProps) => <StyledTabBar {...props} />}
        >
            {ArrayTabs.map((item, index) => (
                <MainTab.Screen key={`${index}`} options={{ ...item }} {...item} />
            ))}
        </MainTab.Navigator>
    );
};

export default MainTabContainer;
