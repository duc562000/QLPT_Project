import React, { FunctionComponent, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import StyledHeader from 'components/common/StyledHeader';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import yupValidate from 'utilities/yupValidate';
import * as yup from 'yup';
import { StyledInput, StyledInputForm, StyledText, StyledTouchable } from 'components/base';
import Metrics from 'assets/metrics';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { Themes } from 'assets/themes';
import StyledOverlayLoading from 'components/base/StyledOverlayLoading';
import Images from 'assets/images';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import { goBack, navigate } from 'navigation/NavigationService';
import AlertMessage from 'components/base/AlertMessage';
import { userInfoActions } from 'app-redux/slices/userInfoSlice';
import { store } from 'app-redux/store';

const SettingScreen: FunctionComponent = (props: any) => {
    const { dataParams, callBack } = props?.route?.params || {};
    const apiUser = firestore().collection('Users');
    useEffect(() => {
        if (!dataParams) {
            getUser();
        }
    }, []);
    const [dataUser, setDataUser] = useState<any>({});
    const [loading, setLoading] = useState(false);
    const getUser = async () => {
        try {
            setLoading(true);
            const res = await (await apiUser.doc(auth().currentUser?.uid).get()).data();
            store.dispatch(userInfoActions.getUserInfoSuccess(res));
            setDataUser(res);
        } catch (error) {
            AlertMessage(String(error));
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };
    const onSubmitFormEdit = async (formData: any) => {
        try {
            await firestore().collection('Users').doc(auth().currentUser?.uid).update(formData);
            callBack?.();
            goBack();
        } catch (error) {
            AlertMessage(String(error));
        }
    };
    const yupSchema = yup.object().shape({
        name: yupValidate.requireField(),
        phoneNumber: yupValidate.phone(),
        waterPrice: yupValidate.requireField(),
        electricityPrice: yupValidate.requireField(),
    });
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
            <StyledOverlayLoading visible={loading} />
            <StyledHeader
                iconAction={!dataParams && Images.icons.edit}
                onPressAction={() =>
                    navigate(TAB_NAVIGATION_ROOT.HOME_ROUTE.EDIT_USER_SCREEN, {
                        dataParams: dataUser,
                        callBack: getUser,
                    })
                }
                title={dataParams ? 'S???a th??ng tin' : 'Th??ng tin c?? nh??n'}
            />
            <ScrollView contentContainerStyle={[styles.body, !dataParams && { flex: 1 }]}>
                <>
                    {dataParams ? (
                        <FormProvider {...form}>
                            <StyledInputForm
                                customStyle={styles.input}
                                name="name"
                                customPlaceHolder="T??n t??i kho???n:"
                                label="T??n t??i kho???n:"
                                defaultValue={dataParams?.name}
                            />
                            <StyledInputForm
                                customStyle={styles.input}
                                name="phoneNumber"
                                customPlaceHolder="S??? ??i???n tho???i"
                                label="S??? ??i???n tho???i:"
                                keyboardType="number-pad"
                                maxLength={10}
                                defaultValue={dataParams?.phoneNumber}
                            />
                            <StyledInputForm
                                customStyle={styles.input}
                                name="waterPrice"
                                customPlaceHolder="Gi?? n?????c"
                                label="Gi?? n?????c:"
                                keyboardType="number-pad"
                                defaultValue={String(dataParams?.waterPrice || '')}
                            />
                            <StyledInputForm
                                customStyle={styles.input}
                                name="electricityPrice"
                                customPlaceHolder="Gi?? ??i???n"
                                label="Gi?? ??i???n:"
                                keyboardType="number-pad"
                                defaultValue={String(dataParams?.electricityPrice || '')}
                            />
                        </FormProvider>
                    ) : (
                        <>
                            <StyledInput
                                customStyle={styles.input}
                                customPlaceHolder="T??n t??i kho???n:"
                                label="T??n t??i kho???n:"
                                value={dataUser?.name}
                                editable={false}
                            />
                            <StyledInput
                                customStyle={styles.input}
                                customPlaceHolder="S??? ??i???n tho???i"
                                label="S??? ??i???n tho???i:"
                                value={dataUser?.phoneNumber}
                                editable={false}
                            />
                            <StyledInput
                                customStyle={styles.input}
                                customPlaceHolder="Gi?? n?????c"
                                label="Gi?? n?????c:"
                                value={String(dataUser?.waterPrice || '')}
                                editable={false}
                            />
                            <StyledInput
                                customStyle={styles.input}
                                customPlaceHolder="Gi?? ??i???n"
                                label="Gi?? ??i???n:"
                                value={String(dataUser?.electricityPrice || '')}
                                editable={false}
                            />
                        </>
                    )}

                    {dataParams && (
                        <StyledTouchable
                            onPress={handleSubmit(onSubmitFormEdit)}
                            disabled={!isValid}
                            customStyle={[styles.button, { backgroundColor: isValid ? '#2B4BF2' : '#ccc' }]}
                        >
                            <StyledText customStyle={styles.textBtn} originValue={'L??u th??ng tin'} />
                        </StyledTouchable>
                    )}
                </>
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
        // alignItems: 'center',
        // flex: 1,
    },
    input: {
        width: Metrics.screenWidth * 0.92,
        color: Themes.COLORS.blue,
        fontWeight: 'bold',
        marginHorizontal: 16,
    },
    button: {
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2B4BF2',
        borderRadius: 8,
        marginTop: 30,
        marginHorizontal: 16,
    },
    textBtn: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Themes.COLORS.white,
    },
});

export default SettingScreen;
