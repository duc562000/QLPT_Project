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

const EditBill: FunctionComponent = ({ route }: any) => {
    const { item } = route?.params || {};
    const [date, setDate] = useState<any[]>([item?.date]);
    const [status, setStatus] = useState<any[]>([item?.status]);
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
            <StyledHeader title={item?.name} />
            <ScrollView style={styles.body}>
                <FormProvider {...form}>
                    <StyledInputForm
                        customStyle={styles.input}
                        name="name"
                        customPlaceHolder="Tên người thuê:"
                        maxLength={32}
                        label="Tên người thuê:"
                        defaultValue={item?.userName}
                    />
                    <StyledInputForm
                        customStyle={styles.input}
                        name="water"
                        customPlaceHolder="Số nước"
                        maxLength={20}
                        label="Số nước:"
                        defaultValue={item?.water}
                    />
                    <StyledInputForm
                        customStyle={styles.input}
                        name="electric"
                        customPlaceHolder="Số điện "
                        maxLength={32}
                        label="Số điện :"
                        defaultValue={item?.electric}
                    />
                    <StyledInputForm
                        customStyle={styles.input}
                        name="date"
                        customPlaceHolder="Ngày tháng thu:"
                        maxLength={20}
                        label="Ngày tháng thu::"
                        defaultValue={item?.date}
                    />

                    <StyledInputForm
                        customStyle={styles.input}
                        name="price"
                        customPlaceHolder="Tổng hoá đơn:"
                        maxLength={20}
                        label="Tổng hoá đơn::"
                        defaultValue={item?.price}
                    />
                    <StyledDropdown
                        label="Tình trạng::"
                        data={['Đã thu tiền', 'Chưa thu tiền']}
                        multiple={false}
                        initSelected={[item?.status ? 'Đã thu tiền' : 'Chưa thu tiền']}
                        onChangeValue={setDate}
                        // containerStyle={styles.dropdown}
                    />
                    {!item?.status && (
                        <StyledTouchable customStyle={styles.button}>
                            <StyledText customStyle={styles.textBtn} originValue={'Chỉnh sửa'} />
                        </StyledTouchable>
                    )}
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

export default EditBill;
