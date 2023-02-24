/* eslint-disable no-unneeded-ternary */
import React, { FunctionComponent, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import StyledHeader from 'components/common/StyledHeader';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import StyledDropdown from 'components/base/StyledDropdown';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { StyledInputForm, StyledText, StyledTouchable } from 'components/base';
import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import { dataSelectStatusRoom } from 'utilities/staticData';
import yupValidate from 'utilities/yupValidate';
import AlertMessage from 'components/base/AlertMessage';
import StyledOverlayLoading from 'components/base/StyledOverlayLoading';
import { goBack } from 'navigation/NavigationService';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const AddRoomScreen: FunctionComponent = ({ route }: any) => {
    const { getRoom } = route?.params || {};
    const [status, setStatus] = useState<any[]>(['Trống']);
    const yupSchema = yup.object().shape({
        roomPrice: yupValidate.requireField(),
        roomName: yupValidate.requireField(),
    });
    const [loading, setLoading] = useState(false);
    const form = useForm({
        mode: 'onChange', // validate form onChange
        // defaultValues: DEFAULT_FORM,
        resolver: yupResolver(yupSchema),
        reValidateMode: 'onChange',
        criteriaMode: 'firstError', // first error from each field will be gathered.
    });
    const {
        formState: { isValid },
        handleSubmit,
    } = form;

    const onCreateRoom = async (value: any) => {
        try {
            setLoading(true);
            const res = await firestore()
                .collection('Rooms')
                .doc(auth().currentUser?.uid)
                .collection('listRoom')
                .add({
                    dateCollection: status[0] === dataSelectStatusRoom[0] ? value?.dateCollection : '',
                    dateRent: status[0] === dataSelectStatusRoom[0] ? value?.dateRent : '',
                    roomName: value?.roomName,
                    roomPrice: Number(value?.roomPrice),
                    status: status[0] === dataSelectStatusRoom[0] ? true : false,
                });
            await firestore()
                .collection('Rooms')
                .doc(auth().currentUser?.uid)
                .collection('listRoom')
                .doc(`${res?.id}`)
                .update({
                    id: res?.id,
                });
            getRoom();
            goBack();
        } catch (error) {
            setLoading(false);
            AlertMessage(String(error));
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <StyledHeader title={'Thêm phòng'} />
            <StyledOverlayLoading visible={loading} />
            <KeyboardAwareScrollView contentContainerStyle={styles.body}>
                <FormProvider {...form}>
                    <StyledInputForm
                        customStyle={styles.input}
                        name="roomName"
                        customLabelStyle={{ paddingLeft: 0 }}
                        customErrorStyle={{ paddingLeft: 0 }}
                        customPlaceHolder="Tên phòng"
                        label="Tên phòng:"
                    />

                    <StyledDropdown
                        label="Tình trạng:"
                        data={dataSelectStatusRoom}
                        multiple={false}
                        initSelected={status}
                        onChangeValue={setStatus}
                        // containerStyle={styles.dropdown}
                    />
                    {status[0] === dataSelectStatusRoom[0] && (
                        <>
                            <StyledInputForm
                                customStyle={styles.input}
                                name="dateRent"
                                customLabelStyle={{ paddingLeft: 0 }}
                                customErrorStyle={{ paddingLeft: 0 }}
                                customPlaceHolder="Ngày thuê"
                                label="Ngày thuê:"
                            />
                            <StyledInputForm
                                customStyle={styles.input}
                                name="dateCollection"
                                customLabelStyle={{ paddingLeft: 0 }}
                                customPlaceHolder="Ngày thu tiền hàng tháng"
                                customErrorStyle={{ paddingLeft: 0 }}
                                label="Ngày thu tiền hàng tháng:"
                            />
                        </>
                    )}

                    <StyledInputForm
                        customStyle={styles.input}
                        name="roomPrice"
                        customLabelStyle={{ paddingLeft: 0 }}
                        customPlaceHolder="Giá phòng"
                        keyboardType="number-pad"
                        customErrorStyle={{ paddingLeft: 0 }}
                        label="Giá phòng:"
                    />
                    <StyledTouchable
                        onPress={handleSubmit(onCreateRoom)}
                        disabled={!isValid}
                        customStyle={[styles.button, { backgroundColor: isValid ? '#2B4BF2' : '#ccc' }]}
                    >
                        <StyledText customStyle={styles.textBtn} originValue="Thêm phòng" />
                    </StyledTouchable>
                </FormProvider>
            </KeyboardAwareScrollView>
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
