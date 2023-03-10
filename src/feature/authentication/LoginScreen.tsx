import { yupResolver } from '@hookform/resolvers/yup';
import { Themes } from 'assets/themes';
import { StyledButton, StyledInputForm, StyledText, StyledTouchable } from 'components/base';
import StyledOverlayLoading from 'components/base/StyledOverlayLoading';
import { AUTHENTICATE_ROUTE } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React, { FunctionComponent, useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useLogin } from 'utilities/authenticate/AuthenticateService';
import yupValidate from 'utilities/yupValidate';

import * as yup from 'yup';

const DEFAULT_FORM: any = {
    email: 'duc@gmail.com.vn',
    password: '123123123',
};

const LoginScreen: FunctionComponent = () => {
    const passwordRef = useRef<any>(null);
    const { requestLogin, loading } = useLogin();
    const yupSchema = yup.object().shape({
        email: yupValidate.email(),
        password: yupValidate.requireField(),
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

    const doRegister = () => {
        navigate(AUTHENTICATE_ROUTE.REGISTER);
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
                <StyledText customStyle={styles.textLogin} originValue="????ng nh???p" />
                <FormProvider {...form}>
                    <StyledInputForm
                        name="email"
                        customPlaceHolder="Email"
                        keyboardType="email-address"
                        onSubmitEditing={() => passwordRef.current.focus()}
                        label="Email"
                        customLabelStyle={{ paddingLeft: 0 }}
                    />
                    <StyledInputForm
                        name="password"
                        customPlaceHolder="M???t kh???u"
                        ref={passwordRef}
                        secureTextEntry
                        returnKeyType="done"
                        label="M???t kh???u"
                        customLabelStyle={{ paddingLeft: 0 }}
                    />
                </FormProvider>

                <StyledButton
                    onPress={handleSubmit(requestLogin)}
                    // onPress={() => store.dispatch(userInfoActions.updateToken({ token: 'dsdsd' }))}
                    title="????ng nh???p"
                    disabled={!isValid}
                    customStyleText={styles.textButton}
                />
                <View style={styles.viewFooter}>
                    <StyledText customStyle={styles.text1} originValue="Ch??a c?? t??i kho???n?" />
                    <StyledTouchable onPress={doRegister} customStyle={styles.registerButton}>
                        <StyledText customStyle={styles.text2} originValue="????ng k??" />
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
        paddingBottom: 30,
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

export default LoginScreen;
