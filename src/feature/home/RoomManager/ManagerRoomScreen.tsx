import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import { RefreshControl, StyleSheet, TextInput, View } from 'react-native';
import StyledHeader from 'components/common/StyledHeader';
import { StyledList } from 'components/base';
import { navigate } from 'navigation/NavigationService';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import Images from 'assets/images';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import AlertMessage from 'components/base/AlertMessage';
import StyledOverlayLoading from 'components/base/StyledOverlayLoading';
import { Themes } from 'assets/themes';
import ItemRoom from '../components/ItemRoom';

const ManagerRoomScreen: FunctionComponent = () => {
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
    const onDeleteRoom = async (id: any) => {
        try {
            setLoading(true);
            firestore().collection('Rooms').doc(auth().currentUser?.uid).collection('listRoom').doc(`${id}`).delete();
            getRoom();
        } catch (error) {
            AlertMessage(String(error));
            setLoading(false);
        }
    };
    const renderItem = ({ item }: any) => (
        <ItemRoom
            roomName={item?.roomName}
            onPress={() => navigate(TAB_NAVIGATION_ROOT.HOME_ROUTE.DETAIL_ROOM_SCREEN, { item, getRoom })}
            onLongPress={() =>
                AlertMessage(
                    'Mọi thông tin của phòng sẽ bị xóa, bạn có chắc chắn không ?',
                    'Thông báo',
                    'Xóa phòng',
                    () => onDeleteRoom(item?.id),
                    true,
                )
            }
        />
    );
    return (
        <View style={styles.container}>
            <StyledHeader
                iconAction={Images.icons.add}
                onPressAction={() => navigate(TAB_NAVIGATION_ROOT.HOME_ROUTE.ADD_ROOM_SCREEN, { getRoom })}
                isBack
                title={'Quản lý phòng'}
            />
            <StyledOverlayLoading visible={loading} />
            <View style={styles.body}>
                <StyledList
                    numColumns={3}
                    refreshControl={
                        <RefreshControl
                            refreshing={false}
                            colors={[Themes.COLORS.primary]}
                            tintColor={Themes.COLORS.primary}
                            onRefresh={getRoom}
                        />
                    }
                    data={roomData}
                    renderItem={renderItem}
                />
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

export default ManagerRoomScreen;
