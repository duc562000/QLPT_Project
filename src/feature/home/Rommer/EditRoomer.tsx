import React, { FunctionComponent, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import StyledHeader from 'components/common/StyledHeader';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import yupValidate from 'utilities/yupValidate';
import * as yup from 'yup';
import { StyledInputForm, StyledText, StyledTouchable } from 'components/base';
import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import AlertMessage from 'components/base/AlertMessage';
import StyledOverlayLoading from 'components/base/StyledOverlayLoading';
import { goBack } from 'navigation/NavigationService';

const EditRoomer: FunctionComponent = ({ route }: any) => {
    const [loading, setLoading] = useState(false);
    const { item, getRoom } = route?.params || {};
    console.log(item);
    const yupSchema = yup.object().shape({
        nameRoomer: yupValidate.requireField(),
        cccdNumber: yupValidate.requireField(),
        phoneNumber: yupValidate.phone(),
        address: yupValidate.requireField(),
    });
    const form = useForm({
        mode: 'onChange', // validate form onChange
        // defaultValues: DEFAULT_FORM,
        resolver: yupResolver(yupSchema),
        reValidateMode: 'onChange',
        criteriaMode: 'firstError', // first error from each field will be gathered.
    });
    const onSubmitEdit = async (value: any) => {
        try {
            setLoading(true);
            await firestore()
                .collection('Rooms')
                .doc(auth().currentUser?.uid)
                .collection('listRoom')
                .doc(`${item?.id}`)
                .update({
                    roomerRental: {
                        nameRoomer: value.nameRoomer,
                        cccdNumber: value.cccdNumber,
                        phoneNumber: value.phoneNumber,
                        address: value.address,
                    },
                });
            await firestore()
                .collection('Rooms')
                .doc(auth().currentUser?.uid)
                .collection('listRoom')
                .doc(`${item?.id}`)
                .update({
                    status: true,
                });
            // callbackParams?.();
            getRoom?.();
            goBack();
        } catch (error) {
            AlertMessage(String(error));
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };
    const {
        formState: { isValid },
        handleSubmit,
    } = form;
    return (
        <View style={styles.container}>
            <StyledHeader title={item?.roomName} />
            <StyledOverlayLoading visible={loading} />
            <ScrollView contentContainerStyle={styles.body}>
                <FormProvider {...form}>
                    <StyledInputForm
                        customStyle={styles.input}
                        name="nameRoomer"
                        customPlaceHolder="Tên người thuê:"
                        label="Tên người thuê:"
                        defaultValue={item?.roomerRental?.nameRoomer}
                        customLabelStyle={{ paddingLeft: 0 }}
                        customErrorStyle={{ paddingLeft: 0 }}
                    />
                    <StyledInputForm
                        customStyle={styles.input}
                        name="cccdNumber"
                        customPlaceHolder="CCCD"
                        keyboardType="number-pad"
                        label="Số CCCD"
                        defaultValue={item?.roomerRental?.cccdNumber}
                        customLabelStyle={{ paddingLeft: 0 }}
                        customErrorStyle={{ paddingLeft: 0 }}
                    />
                    <StyledInputForm
                        customStyle={styles.input}
                        name="phoneNumber"
                        customPlaceHolder="Số điện thoại"
                        label="Số điện thoại:"
                        maxLength={10}
                        keyboardType="number-pad"
                        defaultValue={item?.roomerRental?.phoneNumber}
                        customLabelStyle={{ paddingLeft: 0 }}
                        customErrorStyle={{ paddingLeft: 0 }}
                    />
                    <StyledInputForm
                        customStyle={styles.input}
                        name="address"
                        customPlaceHolder="Địa chỉ thường trú:"
                        label="Địa chỉ thường trú:"
                        defaultValue={item?.roomerRental?.address}
                        customLabelStyle={{ paddingLeft: 0 }}
                        customErrorStyle={{ paddingLeft: 0 }}
                    />
                    <StyledTouchable
                        disabled={!isValid}
                        onPress={handleSubmit(onSubmitEdit)}
                        customStyle={[styles.button, { backgroundColor: isValid ? '#2B4BF2' : '#ccc' }]}
                    >
                        <StyledText
                            customStyle={styles.textBtn}
                            originValue={item?.roomerRental ? 'Chỉnh sửa' : 'Thêm người thuê'}
                        />
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

export default EditRoomer;
