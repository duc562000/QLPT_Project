const common = {
    white: '#fff',
    transparent: 'transparent',
    black: '#000',
    blue: 'blue',
    placeHolderGray: 'rgba(216, 216, 216, 0.6)',
    borderInputError: '#ff0000',
    green: 'green',
    grey: 'grey',
};

const Light = {
    COLORS: {
        ...common,
        primary: '#4287f5',
        secondary: '#BDE4F4',
        textPrimary: '#000000',
        textSecondary: '#475372',
        backgroundModalUpdate: '#323232',
        backdropModalUpdate: '#00000071',
        progressUpdateColor: '#28A696',
        colorText: '#404969',
        grayC4: '#C4C4C4',
        grayD1: '#DEDDE1',
        backgroundTab: '#F0EFF1',
    },
    FONTS: {
        defaultFont: 'Montserrat-Regular',
        boldFont: 'Montserrat-SemiBold',
        thinFont: 'Montserrat-Light',
    },
};

const Dark = {
    colors: {
        ...common,
        primary: '#607d8b',
        secondary: '#607d8b',
        textPrimary: '#607d8b',
        textSecondary: '#607d8b',
    },
    fonts: {
        defaultFont: 'Montserrat-Regular',
        boldFont: 'Montserrat-SemiBold',
        thinFont: 'Montserrat-Light',
    },
};

export const Themes = Light;

export const ThemesDark = Dark;
