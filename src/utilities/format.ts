import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import numeral from 'numeral';
import i18next from 'i18next';

dayjs.locale('ja');

export const YYYYMMDD_JP = 'YYYY年MM月DD日';
export const YYYYMMDD = 'YYYY/MM/DD';
export const DDMM = 'DD/MM';

export const changeLocale = (locale: string): void => {
    dayjs.locale(locale);
};
export const toLocalStringTime = (date: Date): string => {
    return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
};

export const requireField = (field: string) => {
    return i18next.t('Trường này bắt buộc nhập', { field }) || '';
};
export const formatToVND = (point: number) => {
    if (!point) return '';
    return point?.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' / số';
};
export const formatDate = (date: Date | string | number, defaultFormat = YYYYMMDD) => {
    if (!date) return '';
    return `${dayjs(date).format(defaultFormat)}`;
};
