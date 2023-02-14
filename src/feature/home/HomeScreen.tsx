import { userInfoActions } from 'app-redux/slices/userInfoSlice';
import { store } from 'app-redux/store';
import { StyledText, StyledTouchable } from 'components/base';
import StyledHeader from 'components/common/StyledHeader';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React, { FunctionComponent } from 'react';
import { StyleSheet, View } from 'react-native';

const HomeScreen: FunctionComponent = () => {
    return (
        <View style={{ flex: 1 }}>
            <StyledHeader title={'Trang chủ'} isBack={false} />
            <View style={styles.body}>
                <StyledTouchable
                    onPress={() => navigate(TAB_NAVIGATION_ROOT.HOME_ROUTE.MANAGER_SCREEN)}
                    customStyle={styles.buttonNavigate}
                >
                    <StyledText customStyle={styles.textButton} originValue="Quản lý phòng" />
                </StyledTouchable>
                <StyledTouchable customStyle={styles.buttonNavigate}>
                    <StyledText customStyle={styles.textButton} originValue="Quản lý nguời thuê" />
                </StyledTouchable>
                <StyledTouchable customStyle={styles.buttonNavigate}>
                    <StyledText customStyle={styles.textButton} originValue="Quản lý  hoá đơn " />
                </StyledTouchable>
                <StyledTouchable customStyle={styles.buttonNavigate}>
                    <StyledText customStyle={styles.textButton} originValue="Quản lý cài đặt" />
                </StyledTouchable>
                <StyledTouchable
                    onPress={() => store.dispatch(userInfoActions.updateToken({ token: '', refreshToken: '' }))}
                    customStyle={styles.buttonNavigate}
                >
                    <StyledText customStyle={styles.textButton} originValue="Đăng xuất" />
                </StyledTouchable>
            </View>
        </View>
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
