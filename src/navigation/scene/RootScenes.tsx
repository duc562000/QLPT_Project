import { createStackNavigator } from '@react-navigation/stack';
import { useAppSelector } from 'app-redux/hooks';
import EditBill from 'feature/home/Bill/EditBill';
import ManagerBill from 'feature/home/Bill/ManagerBill';
import HomeDataScreen from 'feature/home/HomeDataScreen';
import HomeDetailScreen from 'feature/home/HomeDetailScreen';
import HomeUserListScreen from 'feature/home/HomeUserListScreen';
import EditRoomer from 'feature/home/Rommer/EditRoomer';
import MangerRoommer from 'feature/home/Rommer/MangerRoommer';
import ManagerRoomScreen from 'feature/home/RoomManager/ManagerRoomScreen';
import AddRoomScreen from 'feature/home/RoomManager/AddRoomScreen';
import EditRoomScreen from 'feature/home/RoomManager/EditRoomScreen';
import ManagerScreen from 'feature/home/Settting/ManagerScreen';
import SettingScreen from 'feature/home/Settting/SettingScreen';
import React from 'react';
import isEqual from 'react-fast-compare';
import { Host } from 'react-native-portalize';
import navigationConfigs from '../config/options';
import { APP_ROUTE, TAB_NAVIGATION_ROOT } from '../config/routes';
import AuthStack from './AuthScenes';
import MainTabContainer from './TabScenes';

export type RootStackParamList = Record<string, any>;

const MainStack = createStackNavigator<RootStackParamList>();

const AppStack = () => (
    <Host>
        <MainStack.Navigator screenOptions={navigationConfigs}>
            <MainStack.Screen name={APP_ROUTE.MAIN_TAB} component={MainTabContainer} />

            <MainStack.Screen name={TAB_NAVIGATION_ROOT.HOME_ROUTE.MANAGER_SCREEN} component={ManagerRoomScreen} />
            <MainStack.Screen name={TAB_NAVIGATION_ROOT.HOME_ROUTE.EDIT_ROOM_SCREEN} component={EditRoomScreen} />
            <MainStack.Screen name={TAB_NAVIGATION_ROOT.HOME_ROUTE.ADD_ROOM_SCREEN} component={AddRoomScreen} />
            <MainStack.Screen name={TAB_NAVIGATION_ROOT.HOME_ROUTE.MANAGER_ROOMER_SCREEN} component={MangerRoommer} />
            <MainStack.Screen name={TAB_NAVIGATION_ROOT.HOME_ROUTE.EDIT_ROOMER_SCREEN} component={EditRoomer} />
            <MainStack.Screen name={TAB_NAVIGATION_ROOT.HOME_ROUTE.DETAIL_ROOM_SCREEN} component={EditRoomScreen} />
            <MainStack.Screen name={TAB_NAVIGATION_ROOT.HOME_ROUTE.MANAGER_BILL_SCREEN} component={ManagerBill} />
            <MainStack.Screen name={TAB_NAVIGATION_ROOT.HOME_ROUTE.EDIT_BILL_SCREEN} component={EditBill} />
            <MainStack.Screen name={TAB_NAVIGATION_ROOT.HOME_ROUTE.SETTING_SCREEN} component={SettingScreen} />
            <MainStack.Screen name={TAB_NAVIGATION_ROOT.HOME_ROUTE.EDIT_USER_SCREEN} component={SettingScreen} />
            <MainStack.Screen name={TAB_NAVIGATION_ROOT.HOME_ROUTE.WEB_VIEW} component={HomeDetailScreen} />
            <MainStack.Screen name={TAB_NAVIGATION_ROOT.HOME_ROUTE.HOME_DATA} component={HomeDataScreen} />
            <MainStack.Screen name={TAB_NAVIGATION_ROOT.HOME_ROUTE.HOME_USER_LIST} component={HomeUserListScreen} />
        </MainStack.Navigator>
    </Host>
);

const Navigation: React.FunctionComponent = () => {
    const { token } = useAppSelector(state => state.userInfo, isEqual);
    if (token) {
        return <AppStack />;
    }
    return <AuthStack />;
};

export default Navigation;
