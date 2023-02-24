/* eslint-disable no-unneeded-ternary */
import React, { FunctionComponent, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
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
import { dataPriceRoom } from 'utilities/staticData';
import AlertMessage from 'components/base/AlertMessage';
import StyledOverlayLoading from 'components/base/StyledOverlayLoading';
import { useAppSelector } from 'app-redux/hooks';
import { goBack } from 'navigation/NavigationService';

const EditBill: FunctionComponent = ({ route }: any) => {
    const { item, getRoom } = route?.params || {};
    const { userInfo } = useAppSelector(state => state);
    const [loading, setLoading] = useState(false);
    const [textElectricNumber, setTextElectricNumber] = useState(item?.bill?.electricNumber);
    const [total, setTotal] = useState();
    const [textWaterNumber, setTextWaterNumber] = useState(item?.bill?.waterNumber);
    useEffect(() => {
        fomatTotal();
    }, [textElectricNumber, textWaterNumber]);

    const fomatTotal = () => {
        setTotal(
            Number(textWaterNumber * userInfo?.user?.waterPrice) +
                Number(textElectricNumber * userInfo?.user?.electricityPrice) +
                Number(item?.roomPrice),
        );
    };
    const [status, setStatus] = useState<any[]>([item?.bill?.statusPriceRoom ? dataPriceRoom[0] : dataPriceRoom[1]]);
    const yupSchema = yup.object().shape({
        // waterNumber: yupValidate.requireField(),
        // electricNumber: yupValidate.requireField(),
        // datePrice: yupValidate.requireField(),
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
                    bill: {
                        electricNumber: textElectricNumber,
                        waterNumber: textWaterNumber,
                        datePrice: value.datePrice,
                        billTotal: total,
                        statusPriceRoom: status[0] === dataPriceRoom[0] ? true : false,
                    },
                    roomerRental: {
                        nameRoomer: value?.nameRoomer,
                    },
                });

            getRoom?.();
            goBack();
        } catch (error) {
            AlertMessage(String(error));
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };
    const form = useForm({
        mode: 'onChange', // validate form onChange
        resolver: yupResolver(yupSchema),
        reValidateMode: 'onChange',
        criteriaMode: 'firstError', // first error from each field will be gathered.
    });
    const {
        formState: { isValid },
        handleSubmit,
    } = form;
    return (
        <View style={styles.container}>
            <StyledHeader title={item?.roomName} />
            <StyledOverlayLoading visible={loading} />
            <ScrollView contentContainerStyle={[styles.body, !item?.roomerRental && { flex: 1 }]}>
                <FormProvider {...form}>
                    <StyledInputForm
                        customStyle={styles.input}
                        editable={!!item?.roomerRental}
                        name="nameRoomer"
                        customPlaceHolder="Tên người thuê:"
                        customLabelStyle={{ paddingLeft: 0 }}
                        customErrorStyle={{ paddingLeft: 0 }}
                        label="Tên người thuê:"
                        defaultValue={item?.roomerRental?.nameRoomer}
                    />
                    <StyledInputForm
                        customStyle={styles.input}
                        name="waterNumber"
                        editable={!!item?.roomerRental}
                        customPlaceHolder="Số nước"
                        keyboardType="number-pad"
                        onChangeText={setTextWaterNumber}
                        value={textWaterNumber}
                        customLabelStyle={{ paddingLeft: 0 }}
                        customErrorStyle={{ paddingLeft: 0 }}
                        label="Số nước:"
                    />
                    <StyledInputForm
                        customStyle={styles.input}
                        name="electricNumber"
                        onChangeText={setTextElectricNumber}
                        value={textElectricNumber}
                        editable={!!item?.roomerRental}
                        customPlaceHolder="Số điện "
                        keyboardType="number-pad"
                        customLabelStyle={{ paddingLeft: 0 }}
                        customErrorStyle={{ paddingLeft: 0 }}
                        label="Số điện :"
                    />
                    <StyledInputForm
                        customStyle={styles.input}
                        name="datePrice"
                        customPlaceHolder="Ngày tháng thu:"
                        maxLength={20}
                        editable={!!item?.roomerRental}
                        label="Ngày tháng thu:"
                        defaultValue={item?.datePrice}
                        customLabelStyle={{ paddingLeft: 0 }}
                        customErrorStyle={{ paddingLeft: 0 }}
                    />

                    {!!item?.roomerRental && (
                        <>
                            <StyledDropdown
                                label="Tình trạng:"
                                data={dataPriceRoom}
                                multiple={false}
                                initSelected={status}
                                onChangeValue={setStatus}
                                // containerStyle={styles.dropdown}
                            />
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    paddingTop: 20,
                                    justifyContent: 'space-between',
                                }}
                            >
                                <StyledText customStyle={styles.textTittle} originValue={'Tổng hóa đơn'} />
                                <StyledText customStyle={styles.priceText} originValue={`${total || '0'} VNĐ`} />
                            </View>

                            <StyledTouchable
                                disabled={!isValid}
                                onPress={handleSubmit(onSubmitEdit)}
                                customStyle={[styles.button, { backgroundColor: isValid ? '#2B4BF2' : '#ccc' }]}
                            >
                                <StyledText customStyle={styles.textBtn} originValue="Chỉnh sửa" />
                            </StyledTouchable>
                        </>
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
        // flex: 1,
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
    textTittle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: Themes.COLORS.primary,
    },
    priceText: {
        fontSize: 18,
        color: 'red',
        fontWeight: 'bold',
    },
});

export default EditBill;
