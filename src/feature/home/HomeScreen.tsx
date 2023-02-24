import { useAppSelector } from 'app-redux/hooks';
import { StyledText, StyledTouchable } from 'components/base';
import StyledHeader from 'components/common/StyledHeader';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React, { FunctionComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import AuthenticateService from 'utilities/authenticate/AuthenticateService';

const HomeScreen: FunctionComponent = () => {
    const { userInfo } = useAppSelector(state => state);
    return (
        <>
            <StyledHeader isBack={false} title={`Xin chào ${userInfo?.user?.name} !`} />
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <View style={styles.body}>
                    <StyledTouchable
                        onPress={() => navigate(TAB_NAVIGATION_ROOT.HOME_ROUTE.MANAGER_SCREEN)}
                        customStyle={styles.buttonNavigate}
                    >
                        <StyledText customStyle={styles.textButton} originValue="Quản lý phòng" />
                    </StyledTouchable>
                    <StyledTouchable
                        onPress={() => navigate(TAB_NAVIGATION_ROOT.HOME_ROUTE.MANAGER_ROOMER_SCREEN)}
                        customStyle={styles.buttonNavigate}
                    >
                        <StyledText customStyle={styles.textButton} originValue="Quản lý nguời thuê" />
                    </StyledTouchable>
                    <StyledTouchable
                        onPress={() =>
                            navigate(TAB_NAVIGATION_ROOT.HOME_ROUTE.MANAGER_BILL_SCREEN, {
                                name: 'Quản lý  hoá đơn ',
                                isBill: true,
                            })
                        }
                        customStyle={styles.buttonNavigate}
                    >
                        <StyledText customStyle={styles.textButton} originValue="Quản lý  hoá đơn " />
                    </StyledTouchable>
                    <StyledTouchable
                        onPress={() =>
                            navigate(TAB_NAVIGATION_ROOT.HOME_ROUTE.SETTING_SCREEN, {
                                name: 'Quản lý cài đặt',
                                isSetting: true,
                            })
                        }
                        customStyle={styles.buttonNavigate}
                    >
                        <StyledText customStyle={styles.textButton} originValue="Thông tin cá nhân" />
                    </StyledTouchable>
                    <StyledTouchable onPress={AuthenticateService.logOut} customStyle={styles.buttonNavigate}>
                        <StyledText customStyle={styles.textButton} originValue="Đăng xuất" />
                    </StyledTouchable>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    buttonNavigate: {
        padding: 20,
        borderRadius: 6,
        backgroundColor: '#fff',
        elevation: 5, // Android
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 12,
    },
    body: {
        paddingHorizontal: 16,
        marginTop: 20,
    },
    textButton: {
        color: '#4285F4',
        fontSize: 20,
        fontWeight: '600',
    },
});

export default HomeScreen;
