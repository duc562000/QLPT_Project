import React, { FunctionComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import StyledHeader from 'components/common/StyledHeader';
import { StyledList, StyledText, StyledTouchable } from 'components/base';
import { dataRoom } from 'utilities/staticData';
import { navigate } from 'navigation/NavigationService';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';

const ManagerScreen: FunctionComponent = () => {
    const renderItem = ({ item }: any) => (
        <StyledTouchable
            onPress={() => navigate(TAB_NAVIGATION_ROOT.HOME_ROUTE.EDIT_ROOM_SCREEN)}
            customStyle={styles.viewButton}
        >
            <StyledText originValue={item?.name} />
        </StyledTouchable>
    );
    return (
        <View style={styles.container}>
            <StyledHeader isBack title={'Home Details'} />
            <View style={styles.body}>
                <StyledList numColumns={3} data={dataRoom} renderItem={renderItem} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    body: {
        alignItems: 'center',
    },
    viewButton: {
        height: 90,
        width: 90,
        backgroundColor: '#29B6F6',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        margin: 10,
    },
});

export default ManagerScreen;
