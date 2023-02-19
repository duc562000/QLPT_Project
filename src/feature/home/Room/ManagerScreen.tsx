import React, { FunctionComponent, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import StyledHeader from 'components/common/StyledHeader';
import { StyledList, StyledText, StyledTouchable } from 'components/base';
import { dataRoom } from 'utilities/staticData';
import { navigate } from 'navigation/NavigationService';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import Images from 'assets/images';
import ItemRoom from '../components/ItemRoom';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import AlertMessage from 'components/base/AlertMessage';
import StyledOverlayLoading from 'components/base/StyledOverlayLoading';

const ManagerScreen: FunctionComponent = ({ route }: any) => {
    const [roomData, setRoomData] = useState<any>({});
    const [loading, setLoading] = useState(false);
    // const apiRoom = firestore().collection('Users');
    useEffect(() => {
        getRoom();
    }, []);
    const getRoom = async () => {
        try {
            setLoading(true);
            const res = await firestore()
                .collection('Users')
                .doc(auth().currentUser?.uid)
                .collection('room')
                .doc('room')
                .get();
            setRoomData(res?._data?.listRoom);
        } catch (error) {
            AlertMessage(String(error));
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };
    const renderItem = ({ item }: any) => (
        <ItemRoom
            roomName={item?.id}
            onPress={() => navigate(TAB_NAVIGATION_ROOT.HOME_ROUTE.DETAIL_ROOM_SCREEN, { item, callBack: getRoom })}
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
            <StyledOverlayLoading visible={loading} />
            <View style={styles.body}>
                <StyledList numColumns={3} data={roomData} renderItem={renderItem} />
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
