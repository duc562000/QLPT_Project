import { TypeLoginRequest } from 'api/interface/authenticate';
import request from 'api/request';
import { userInfoActions } from 'app-redux/slices/userInfoSlice';
import { store } from 'app-redux/store';
import AlertMessage from 'components/base/AlertMessage';
import { useState } from 'react';
import { deleteTagOneSignal, pushTagMember } from 'utilities/notification';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const AUTH_URL_REFRESH_TOKEN = '/refreshToken';

interface LoginRequest {
    loading: boolean;
    requestLogin: (values: TypeLoginRequest) => Promise<void>;
}

export const isLogin = () => {
    const { userInfo } = store.getState();
    return !!userInfo?.token;
};

const AuthenticateService = {
    refreshToken: (inputRefreshToken: string) =>
        request.post(AUTH_URL_REFRESH_TOKEN, {
            refresh_token: inputRefreshToken,
        }),
    logOut: () => {
        store.dispatch(userInfoActions.logOut());
        deleteTagOneSignal();
    },
    handlerLogin: (token: Record<string, string>) => {
        const { userInfo } = store.getState();
        store.dispatch(userInfoActions.updateToken(token));
        pushTagMember(userInfo.user?.id as number);
    },
};

export const useLogin = (): LoginRequest => {
    const [loading, setLoading] = useState(false);
    const requestLogin = async (options: TypeLoginRequest) => {
        try {
            setLoading(true);
            await auth().signInWithEmailAndPassword(options?.email, options?.password);
            const res = await (await firestore().collection('Users').doc(auth().currentUser?.uid).get()).data();
            store.dispatch(userInfoActions.getUserInfoRequest(res?.token));
            store.dispatch(userInfoActions.getUserInfoSuccess(res));
            AuthenticateService.handlerLogin({ ...res });
        } catch (e: any) {
            if (e?.code === 'auth/user-not-found') {
                AlertMessage('Tài khoản hoặc mật khẩu chưa chính xác');
            } else {
                AlertMessage(String(e));
            }
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        requestLogin,
    };
};

export default AuthenticateService;
