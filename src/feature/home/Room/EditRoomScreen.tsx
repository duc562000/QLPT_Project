import React, { FunctionComponent, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import StyledHeader from 'components/common/StyledHeader';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import StyledDropdown from 'components/base/StyledDropdown';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import yupValidate from 'utilities/yupValidate';
import * as yup from 'yup';
import { StyledInput, StyledInputForm, StyledText, StyledTouchable } from 'components/base';
import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import Images from 'assets/images';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import AlertMessage from 'components/base/AlertMessage';

const EditRoomScreen: FunctionComponent = ({ route }: any) => {
    const { item, callback, dataParams, isEdit } = route?.params || {};
    const [date, setDate] = useState<any[]>([item?.date]);
    const [status, setStatus] = useState<any[]>([dataParams?.status ? 'Đã thuê' : 'Trống']);
    const yupSchema = yup.object().shape({
        dateRoomRental: status?.[0] === 'Đã thuê' && yupValidate.requireField(),
        dateCollection: status?.[0] === 'Đã thuê' && yupValidate.requireField(),
        price: yupValidate.requireField(),
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
        handleSubmit,
    } = form;
    const onSubmitEdit = async (value: any) => {
        try {
            // setLoading(true);
            const res = await firestore()
                .collection('Room')
                .doc(auth().currentUser?.uid)
                .update({
                    listRoom[0]: [{}, { id: 5 }],
                });

            // .update({
            //     ...value,
            //     status: status?.[0] === 'Đã thuê' ? true : false,
            // });
            console.log(res);
        } catch (error) {
            AlertMessage(String(error));
        }
    };
    return (
        <View style={styles.container}>
            <StyledHeader
                iconAction={!dataParams && Images.icons.edit}
                onPressAction={() =>
                    navigate(TAB_NAVIGATION_ROOT.HOME_ROUTE.EDIT_ROOM_SCREEN, {
                        dataParams: item,
                        isEdit: true,
                        callback,
                    })
                }
                title={item?.name || dataParams?.name}
            />
            <View style={styles.body}>
                {isEdit || dataParams ? (
                    <FormProvider {...form}>
                        <StyledDropdown
                            label="Tình trạng:"
                            data={['Đã thuê', 'Trống']}
                            multiple={false}
                            initSelected={status}
                            onChangeValue={setStatus}
                            // containerStyle={styles.dropdown}
                        />
                        {status?.[0] === 'Đã thuê' && (
                            <>
                                <StyledInputForm
                                    customStyle={styles.input}
                                    name="dateRoomRental"
                                    customLabelStyle={{ paddingLeft: 0 }}
                                    customErrorStyle={{ paddingLeft: 0 }}
                                    customPlaceHolder="Ngày thuê"
                                    label="Ngày thuê:"
                                    defaultValue={dataParams?.dateRent}
                                />
                                <StyledInputForm
                                    customStyle={styles.input}
                                    name="dateCollection"
                                    customLabelStyle={{ paddingLeft: 0 }}
                                    customPlaceHolder="Ngày thu tiền hàng tháng"
                                    customErrorStyle={{ paddingLeft: 0 }}
                                    label="Ngày thu tiền hàng tháng:"
                                    defaultValue={String(dataParams?.dateCollection)}
                                />
                            </>
                        )}

                        <StyledInputForm
                            customStyle={styles.input}
                            name="price"
                            customLabelStyle={{ paddingLeft: 0 }}
                            customPlaceHolder="Giá phòng"
                            maxLength={20}
                            customErrorStyle={{ paddingLeft: 0 }}
                            label="Giá phòng:"
                            defaultValue={String(dataParams?.roomPrice || '')}
                        />
                        <StyledTouchable
                            onPress={handleSubmit(onSubmitEdit)}
                            disabled={!isValid}
                            customStyle={[styles.button, { backgroundColor: isValid ? '#2B4BF2' : '#ccc' }]}
                        >
                            <StyledText customStyle={styles.textBtn} originValue="Lưu thay đổi" />
                        </StyledTouchable>
                    </FormProvider>
                ) : (
                    <>
                        <StyledInput
                            customStyle={styles.input}
                            customPlaceHolder="Tình trạng:"
                            label="Tình trạng:"
                            value={item?.status ? 'Đã thuê' : 'Trống'}
                            editable={false}
                            customLabelStyle={{ paddingHorizontal: 0 }}
                        />
                        <StyledInput
                            customStyle={styles.input}
                            customPlaceHolder="Ngày thuê:"
                            label="Ngày thuê:"
                            value={item?.dateRent}
                            customLabelStyle={{ paddingHorizontal: 0 }}
                            editable={false}
                        />
                        <StyledInput
                            customStyle={styles.input}
                            customPlaceHolder="Ngày thu tiền hàng tháng"
                            label="Ngày thu tiền hàng tháng:"
                            value={String(item?.dateCollection)}
                            editable={false}
                            customLabelStyle={{ paddingHorizontal: 0 }}
                        />
                        <StyledInput
                            customStyle={styles.input}
                            customPlaceHolder="Giá phòng"
                            label="Giá phòng:"
                            value={String(item?.roomPrice || '')}
                            customLabelStyle={{ paddingHorizontal: 0 }}
                            editable={false}
                        />
                    </>
                )}
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

export default EditRoomScreen;
