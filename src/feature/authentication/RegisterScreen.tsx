import { yupResolver } from '@hookform/resolvers/yup';

import { Themes } from 'assets/themes';
import { StyledButton, StyledInputForm, StyledText, StyledTouchable } from 'components/base';
import StyledOverlayLoading from 'components/base/StyledOverlayLoading';
import { goBack } from 'navigation/NavigationService';
import React, { FunctionComponent, useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useLogin } from 'utilities/authenticate/AuthenticateService';
import yupValidate from 'utilities/yupValidate';
import * as yup from 'yup';

const DEFAULT_FORM: any = {
    email: 'hoan.nguyen@amela.vns',
    password: '123123123',
};

const RegisterScreen: FunctionComponent = () => {
    const passwordRef = useRef<any>(null);
    const {
        // requestLogin,
        loading,
    } = useLogin();

    const yupSchema = yup.object().shape({
        email: yupValidate.email(),
        password: yupValidate.password(),
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
    } = form;

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
                <StyledText customStyle={styles.textLogin} originValue="Đăng ký" />
                <FormProvider {...form}>
                    <StyledInputForm
                        name="email"
                        customPlaceHolder="Email"
                        returnKeyType="done"
                        maxLength={20}
                        label="Email"
                    />
                    <StyledInputForm
                        name="Username"
                        customPlaceHolder="Họ và Tên"
                        returnKeyType="done"
                        maxLength={20}
                        label="Email"
                    />
                    <StyledInputForm
                        name="password"
                        customPlaceHolder="Mật khẩu"
                        ref={passwordRef}
                        secureTextEntry
                        returnKeyType="done"
                        maxLength={20}
                        label="Mật khẩu"
                    />
                    <StyledInputForm
                        name="confirmPassword"
                        customPlaceHolder="Nhập lại mật khẩu"
                        ref={passwordRef}
                        secureTextEntry
                        returnKeyType="done"
                        maxLength={20}
                        label="Nhập lại mật khẩu"
                    />
                </FormProvider>

                <StyledButton
                    // onPress={handleSubmit(requestLogin)}
                    onPress={() => console.log('dang ky')}
                    title="Đăng ký"
                    disabled={!isValid}
                    customStyleText={styles.textButton}
                />
                <View style={styles.viewFooter}>
                    <StyledText customStyle={styles.text1} originValue="Đã có tài khoản?" />
                    <StyledTouchable onPress={doLogin} customStyle={styles.registerButton}>
                        <StyledText customStyle={styles.text2} originValue="Đăng nhập" />
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
