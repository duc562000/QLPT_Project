import React, { FunctionComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import StyledText from 'components/base/StyledText';
import { StyledButton } from 'components/base';
import { userInfoActions } from 'app-redux/slices/userInfoSlice';
import { store } from 'app-redux/store';

const SettingView: FunctionComponent = () => {
    return (
        <View style={styles.container}>
            <StyledText originValue={'Setting'} />
            <StyledButton
                onPress={() => store.dispatch(userInfoActions.updateToken({ token: '', refreshToken: '' }))}
                title={'Log out'}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default SettingView;
