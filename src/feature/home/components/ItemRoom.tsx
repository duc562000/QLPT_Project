import React, { FunctionComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { StyledTouchable, StyledText } from 'components/base';
import { Themes } from 'assets/themes';

const ItemRoom: FunctionComponent = (props: any) => {
    const { onPress, roomName, item, isStatus, isPay } = props;
    return (
        <StyledTouchable onPress={onPress} customStyle={styles.viewButton}>
            <StyledText customStyle={{ color: Themes.COLORS.white }} originValue={roomName} />
            {isStatus && (
                <StyledText
                    customStyle={styles.textDescription}
                    originValue={item?.status ? 'Đã thêm thông tin' : 'Chưa có thông tin'}
                />
            )}
            {isPay && (
                <StyledText
                    customStyle={styles.textDescription}
                    originValue={item?.status ? 'Đã thanh toán' : 'Chưa thanh toán'}
                />
            )}
        </StyledTouchable>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    textDescription: {
        fontSize: 9,
        color: '#FEFCFC',
    },
});

export default ItemRoom;
