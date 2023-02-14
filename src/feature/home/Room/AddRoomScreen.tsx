import React, { FunctionComponent, useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import StyledHeader from 'components/common/StyledHeader';

import StyledDropdown from 'components/base/StyledDropdown';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import yupValidate from 'utilities/yupValidate';
import * as yup from 'yup';
import { StyledInputForm, StyledText, StyledTouchable } from 'components/base';
import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';

const AddRoomScreen: FunctionComponent = () => {
    const [date, setDate] = useState<any[]>([]);
    const [status, setStatus] = useState<any[]>([]);
    const yupSchema = yup.object().shape({
        // email: yupValidate.email(),
        // password: yupValidate.password(),
    });
    const form = useForm({
        mode: 'onChange', // validate form onChange
        // defaultValues: DEFAULT_FORM,
        resolver: yupResolver(yupSchema),
        reValidateMode: 'onChange',
        criteriaMode: 'firstError', // first error from each field will be gathered.
    });
    const {
        formState: { isValid },
    } = form;
    return (
        <View style={styles.container}>
            <StyledHeader title={'Edit room'} />
            <ScrollView style={styles.body}>
                <FormProvider {...form}>
                    <StyledInputForm
                        customStyle={styles.input}
                        name="roomName"
                        customPlaceHolder="Nhập tên phòng:"
                        maxLength={20}
                        label="Nhập tên phòng:"
                    />
                    <StyledDropdown
                        label="Tình trạng:"
                        data={['Đã thuê', 'Trống']}
                        multiple={false}
                        initSelected={status}
                        onChangeValue={setStatus}
                        // containerStyle={styles.dropdown}
                    />
                    <StyledDropdown
                        label="Ngày thuê:"
                        data={['01/01/2023', '02/01/2023']}
                        multiple={false}
                        initSelected={date}
                        onChangeValue={setDate}
                        // containerStyle={styles.dropdown}
                    />
                    <StyledInputForm
                        customStyle={styles.input}
                        name="date"
                        customPlaceHolder="Ngày thu tiền hàng tháng"
                        maxLength={32}
                        label="Ngày thu tiền hàng tháng:"
                    />
                    <StyledInputForm
                        customStyle={styles.input}
                        name="price"
                        customPlaceHolder="Giá phòng"
                        maxLength={20}
                        label="Giá phòng:"
                    />
                    <StyledTouchable customStyle={styles.button}>
                        <StyledText customStyle={styles.textBtn} originValue="Thêm phòng" />
                    </StyledTouchable>
                </FormProvider>
            </ScrollView>
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
    body: {
        paddingHorizontal: 16,
    },
    input: {
        width: Metrics.screenWidth * 0.92,
        color: Themes.COLORS.blue,
        fontWeight: 'bold',
    },
    button: {
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2B4BF2',
        borderRadius: 8,
        marginTop: 30,
    },
    textBtn: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Themes.COLORS.white,
    },
});

export default AddRoomScreen;
