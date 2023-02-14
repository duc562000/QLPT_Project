import React, { FunctionComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import StyledHeader from 'components/common/StyledHeader';
import { StyledList, StyledText, StyledTouchable } from 'components/base';
import { dataRoom } from 'utilities/staticData';
import { navigate } from 'navigation/NavigationService';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import Images from 'assets/images';
import ItemRoom from '../components/ItemRoom';

const ManagerScreen: FunctionComponent = ({ route }: any) => {
    const renderItem = ({ item }: any) => (
        <ItemRoom
            roomName={item?.name}
            onPress={() => navigate(TAB_NAVIGATION_ROOT.HOME_ROUTE.EDIT_ROOM_SCREEN, { item })}
        />
    );
    return (
        <View style={styles.container}>
            <StyledHeader
                iconAction={Images.icons.add}
                onPressAction={() => navigate(TAB_NAVIGATION_ROOT.HOME_ROUTE.ADD_ROOM_SCREEN)}
                isBack
                title={route?.params?.name}
            />
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
