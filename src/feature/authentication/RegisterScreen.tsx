/* eslint-disable import/no-extraneous-dependencies */
import { yupResolver } from '@hookform/resolvers/yup';

import { Themes } from 'assets/themes';
import { StyledButton, StyledInputForm, StyledText, StyledTouchable } from 'components/base';
import StyledOverlayLoading from 'components/base/StyledOverlayLoading';
import { goBack } from 'navigation/NavigationService';
import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import yupValidate from 'utilities/yupValidate';
import * as yup from 'yup';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import AlertMessage from 'components/base/AlertMessage';

const DEFAULT_FORM: any = {
    email: 'hoan.nguyen@amela.vns',
    password: '123123123',
    confirmPassword: '123123123',
    name: 'Duc',
};
let token = '';
const RegisterScreen: FunctionComponent = () => {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        getFcmtToken();
    }, []);
    const getFcmtToken = async () => {
        auth().onAuthStateChanged(user => {
            user?.getIdToken(true).then((tokenRes: string) => {
                token = tokenRes;
            });
        });
    };
    const passwordRef = useRef<any>(null);
    const passwordConfirmRef = useRef<any>(null);

    const yupSchema = yup.object().shape({
        email: yupValidate.email(),
        password: yupValidate.password(),
        confirmPassword: yupValidate.password('password'),
        name: yupValidate.name(),
    });
    const form = useForm({
        mode: 'onChange', // validate form onChange
        defaultValues: DEFAULT_FORM,
        resolver: yupResolver(yupSchema),
        reValidateMode: 'onChange',
        criteriaMode: 'firstError', // first error from each field will be gathered.
    });
    const {
        formState: { isValid },
        handleSubmit,
    } = form;
    const requestRegister = async (formData: any) => {
        try {
            setLoading(true);

            await auth().createUserWithEmailAndPassword(formData?.email, formData?.password);

            await firestore()
                .collection('Users')
                .doc(auth().currentUser?.uid)
                .set({
                    email: String(formData?.email),
                    name: String(formData?.name),
                    token,
                });
            AlertMessage('????ng k?? t??i kho???n th??nh c??ng !', undefined, '????ng nh???p ngay', () => goBack());
        } catch (error: any) {
            switch (error.code) {
                case 'auth/email-already-in-use':
                    AlertMessage('Email ???? ???????c s??? d???ng!');
                    break;
                case 'auth/invalid-email':
                    AlertMessage('Email ho???c m???t kh???u kh??ng h???p l???!');
                    break;
                default:
                    AlertMessage(error.code);
                    break;
            }
        } finally {
            setLoading(false);
        }
    };
    const doLogin = () => {
        goBack();
    };

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
            // enableOnAndroid={true}
            showsVerticalScrollIndicator={false}
            enableResetScrollToCoords={false}
        >
            <StyledOverlayLoading visible={loading} />
            <View style={styles.body}>
                <StyledText customStyle={styles.textLogin} originValue="????ng k??" />
                <FormProvider {...form}>
                    <StyledInputForm name="email" customPlaceHolder="Email" returnKeyType="done" label="Email" />
                    <StyledInputForm
                        name="name"
                        customPlaceHolder="H??? v?? T??n"
                        returnKeyType="done"
                        label="H??? v?? T??n"
                        customLabelStyle={{ paddingLeft: 0 }}
                    />
                    <StyledInputForm
                        name="password"
                        customPlaceHolder="M???t kh???u"
                        ref={passwordRef}
                        secureTextEntry
                        returnKeyType="done"
                        customLabelStyle={{ paddingLeft: 0 }}
                        label="M???t kh???u"
                    />
                    <StyledInputForm
                        name="confirmPassword"
                        customPlaceHolder="Nh???p l???i m???t kh???u"
                        ref={passwordConfirmRef}
                        secureTextEntry
                        returnKeyType="done"
                        customLabelStyle={{ paddingLeft: 0 }}
                        label="Nh???p l???i m???t kh???u"
                    />
                </FormProvider>

                <StyledButton
                    onPress={handleSubmit(requestRegister)}
                    title="????ng k??"
                    disabled={!isValid}
                    customStyleText={styles.textButton}
                />
                <View style={styles.viewFooter}>
                    <StyledText customStyle={styles.text1} originValue="???? c?? t??i kho???n?" />
                    <StyledTouchable onPress={doLogin} customStyle={styles.registerButton}>
                        <StyledText customStyle={styles.text2} originValue="????ng nh???p" />
                    </StyledTouchable>
                </View>
            </View>
        </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Themes.COLORS.secondary,
    },
    loginButton: {
        marginTop: 20,
        borderWidth: 0,
    },
    registerButton: {},
    errorMessage: {
        color: Themes.COLORS.borderInputError,
    },
    textLogin: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Themes.COLORS.colorText,
        paddingBottom: 20,
    },
    textButton: {
        fontSize: 18,
        fontWeight: '600',
        color: Themes.COLORS.white,
    },
    viewFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 14,
    },
    text1: {
        color: '#616161',
        fontSize: 16,
        paddingRight: 20,
        fontWeight: '600',
    },
    text2: {
        color: '#29B6F6',
        fontWeight: '600',
    },
});

export default RegisterScreen;
