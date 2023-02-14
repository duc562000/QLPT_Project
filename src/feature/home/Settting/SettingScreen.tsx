import React, { FunctionComponent, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import StyledHeader from 'components/common/StyledHeader';

import StyledDropdown from 'components/base/StyledDropdown';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import yupValidate from 'utilities/yupValidate';
import * as yup from 'yup';
import { StyledInputForm, StyledText, StyledTouchable } from 'components/base';
import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';

const SettingScreen: FunctionComponent = () => {
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
            <StyledHeader title={'Cài đặt'} />
            <ScrollView style={styles.body}>
                <FormProvider {...form}>
                    <StyledInputForm
                        customStyle={styles.input}
                        name="date"
                        customPlaceHolder="Tên người thuê:"
                        maxLength={32}
                        label="Tên người thuê:"
                        defaultValue={'Trần Văn Hiển'}
                    />

                    <StyledInputForm
                        customStyle={styles.input}
                        name="phoneNumber"
                        customPlaceHolder="Số điện thoại"
                        maxLength={32}
                        label="Số điện thoại:"
                        defaultValue={'09232322323'}
                    />
                    <StyledInputForm
                        customStyle={styles.input}
                        name="water"
                        customPlaceHolder="Giá nước"
                        maxLength={20}
                        label="Giá nước:"
                        defaultValue={'10000'}
                    />

                    <StyledInputForm
                        customStyle={styles.input}
                        name="price"
                        customPlaceHolder="Giá điện"
                        maxLength={20}
                        label="Giá điện:"
                        defaultValue={'3000'}
                    />

                    <StyledTouchable customStyle={styles.button}>
                        <StyledText customStyle={styles.textBtn} originValue={'Chỉnh sửa'} />
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

export default SettingScreen;
