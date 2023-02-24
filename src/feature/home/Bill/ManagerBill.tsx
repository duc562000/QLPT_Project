import React, { FunctionComponent, useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { StyleSheet, View } from 'react-native';
import StyledHeader from 'components/common/StyledHeader';
import { StyledList, StyledText, StyledTouchable } from 'components/base';
import { dataBill, dataRoom, dataRoomer } from 'utilities/staticData';
import { navigate } from 'navigation/NavigationService';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import Images from 'assets/images';
import ItemRoom from '../components/ItemRoom';
import AlertMessage from 'components/base/AlertMessage';
import StyledOverlayLoading from 'components/base/StyledOverlayLoading';

const ManagerBill: FunctionComponent = ({ route }: any) => {
    const [roomData, setRoomData] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        getRoom();
    }, []);
    const getRoom = async () => {
        setLoading(true);
        try {
            const res = await firestore().collection('Rooms').doc(auth().currentUser?.uid).collection('listRoom').get();
            setRoomData(res.docs.map(doc => doc.data()));
            setLoading(false);
        } catch (error) {
            AlertMessage(String(error));
            setLoading(false);
        }
    };
    const renderItem = ({ item }: any) => (
        <ItemRoom
            isPay
            item={item}
            roomName={item?.roomName}
            onPress={() => navigate(TAB_NAVIGATION_ROOT.HOME_ROUTE.EDIT_BILL_SCREEN, { item, getRoom })}
        />
    );
    return (
        <View style={styles.container}>
            <StyledHeader
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

export default ManagerBill;
