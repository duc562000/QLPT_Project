/* eslint-disable no-unneeded-ternary */
import React, { FunctionComponent, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import StyledHeader from 'components/common/StyledHeader';
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
import { useNavigation } from '@react-navigation/native';
import { dataSelectStatusRoom } from 'utilities/staticData';
import StyledOverlayLoading from 'components/base/StyledOverlayLoading';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const EditRoomScreen: FunctionComponent = ({ route }: any) => {
    const { item, dataParams, callbackParams, getRoom } = route?.params || {};
    const navigation = useNavigation<any>();
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<any[]>([
        dataParams?.status ? dataSelectStatusRoom[0] : dataSelectStatusRoom[1],
    ]);
    const yupSchema = yup.object().shape({
        roomPrice: yupValidate.requireField(),
        roomName: yupValidate.requireField(),
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
            setLoading(true);
            await firestore()
                .collection('Rooms')
                .doc(auth().currentUser?.uid)
                .collection('listRoom')
                .doc(`${dataParams?.id}`)
                .update({
                    dateCollection: status[0] === dataSelectStatusRoom[0] ? value?.dateCollection : '',
                    dateRent: status[0] === dataSelectStatusRoom[0] ? value?.dateRent : '',
                    roomName: value?.roomName,
                    roomPrice: Number(value?.roomPrice),
                    status: status[0] === dataSelectStatusRoom[0] ? true : false,
                });
            callbackParams?.();
            getRoom?.();
            navigation.pop(2);
        } catch (error) {
            AlertMessage(String(error));
            setLoading(false);
        } finally {
            setLoading(false);
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
                        callbackParams: getRoom,
                    })
                }
                title={item?.roomName || dataParams?.roomName}
            />
            <StyledOverlayLoading visible={loading} />
            <ScrollView contentContainerStyle={[styles.body, !dataParams && { flex: 1 }]}>
                {dataParams ? (
                    <FormProvider {...form}>
                        <StyledInputForm
                            customStyle={styles.input}
                            name="roomName"
                            customLabelStyle={{ paddingLeft: 0 }}
                            customErrorStyle={{ paddingLeft: 0 }}
                            customPlaceHolder="T??n ph??ng"
                            label="T??n ph??ng:"
                            defaultValue={dataParams?.roomName}
                        />

                        <StyledDropdown
                            label="T??nh tr???ng:"
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
                                    customPlaceHolder="Ng??y thu??"
                                    label="Ng??y thu??:"
                                    defaultValue={dataParams?.dateRent}
                                />
                                <StyledInputForm
                                    customStyle={styles.input}
                                    name="dateCollection"
                                    customLabelStyle={{ paddingLeft: 0 }}
                                    customPlaceHolder="Ng??y thu ti???n h??ng th??ng"
                                    customErrorStyle={{ paddingLeft: 0 }}
                                    label="Ng??y thu ti???n h??ng th??ng:"
                                    defaultValue={String(dataParams?.dateCollection)}
                                />
                            </>
                        )}

                        <StyledInputForm
                            customStyle={styles.input}
                            name="roomPrice"
                            customLabelStyle={{ paddingLeft: 0 }}
                            customPlaceHolder="Gi?? ph??ng"
                            keyboardType="number-pad"
                            customErrorStyle={{ paddingLeft: 0 }}
                            label="Gi?? ph??ng:"
                            defaultValue={String(dataParams?.roomPrice || '')}
                        />
                        <StyledTouchable
                            onPress={handleSubmit(onSubmitEdit)}
                            disabled={!isValid}
                            customStyle={[styles.button, { backgroundColor: isValid ? '#2B4BF2' : '#ccc' }]}
                        >
                            <StyledText customStyle={styles.textBtn} originValue="L??u thay ?????i" />
                        </StyledTouchable>
                    </FormProvider>
                ) : (
                    <>
                        <StyledInput
                            customStyle={styles.input}
                            customPlaceHolder="T??nh tr???ng:"
                            label="T??nh tr???ng:"
                            value={item?.status ? '???? thu??' : 'Tr???ng'}
                            editable={false}
                            customLabelStyle={{ paddingHorizontal: 0 }}
                        />
                        <StyledInput
                            customStyle={styles.input}
                            customPlaceHolder="Ng??y thu??:"
                            label="Ng??y thu??:"
                            value={item?.dateRent}
                            customLabelStyle={{ paddingHorizontal: 0 }}
                            editable={false}
                        />
                        <StyledInput
                            customStyle={styles.input}
                            customPlaceHolder="Ng??y thu ti???n h??ng th??ng"
                            label="Ng??y thu ti???n h??ng th??ng:"
                            value={String(item?.dateCollection)}
                            editable={false}
                            customLabelStyle={{ paddingHorizontal: 0 }}
                        />
                        <StyledInput
                            customStyle={styles.input}
                            customPlaceHolder="Gi?? ph??ng"
                            label="Gi?? ph??ng:"
                            value={String(item?.roomPrice || '')}
                            customLabelStyle={{ paddingHorizontal: 0 }}
                            editable={false}
                        />
                    </>
                )}
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

export default EditRoomScreen;
