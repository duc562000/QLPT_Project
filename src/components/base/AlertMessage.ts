import i18next from 'i18next';
import { Alert } from 'react-native';

const AlertMessage = (
    message: string,
    title?: string,
    textConfirm?: string,
    onPressOk?: any,
    cancel?: boolean,
    checkNetworkError = true,
) => {
    if (!(checkNetworkError && message === i18next.t('common.error.network'))) {
        Alert.alert(
            title || '',
            message,
            cancel
                ? [
                      {
                          text: i18next.t('Hủy'),
                          style: 'default',
                      },
                      {
                          text: textConfirm || i18next.t('common.confirms'),
                          onPress: () => {
                              if (typeof onPressOk === 'function') {
                                  onPressOk();
                              }
                          },
                          style: 'default',
                      },
                  ]
                : [
                      {
                          text: textConfirm || i18next.t('ok'),
                          onPress: () => {
                              if (typeof onPressOk === 'function') {
                                  onPressOk();
                              }
                          },
                      },
                  ],
            { cancelable: false },
        );
    }
};
export default AlertMessage;
