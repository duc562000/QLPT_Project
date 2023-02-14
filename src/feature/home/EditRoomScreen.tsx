import React, { FunctionComponent, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import StyledHeader from 'components/common/StyledHeader';

import StyledDropdown from 'components/base/StyledDropdown';

const EditRoomScreen: FunctionComponent = () => {
    const [month, setMonth] = useState<any[]>([]);
    return (
        <View style={styles.container}>
            <StyledHeader title={'Edit room'} />
            <View style={styles.body}>
                <StyledDropdown
                    label="myPage.contact.kinds"
                    data={['232', 'sdsd']}
                    multiple={false}
                    initSelected={month}
                    onChangeValue={setMonth}
                    // containerStyle={styles.dropdown}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    dropdown: {
        marginVertical: '12@vs',
    },
});

export default EditRoomScreen;
