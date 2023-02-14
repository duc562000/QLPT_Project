import Images from 'assets/images';
import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledList, StyledTouchable } from 'components/base';
import StyledText from 'components/base/StyledText';
import React, { Dispatch, FC, Fragment, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import { Animated, ListRenderItem, ScrollView, StyleProp, View, ViewStyle } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

interface StyledDropdownProps {
    label?: any;
    required?: boolean;
    data: string[]; // FIXME
    initSelected?: string[];
    multiple?: boolean;
    containerStyle?: StyleProp<ViewStyle>;
    placeholder?: any;
    onChangeValue: (values: string[]) => void;
    errorMessage?: string;
    setScrollDisabled?: Dispatch<SetStateAction<boolean>>;
}

const StyledDropdown: FC<StyledDropdownProps> = ({
    label,
    required = false,
    data,
    multiple = true,
    initSelected = [],
    containerStyle,
    placeholder,
    onChangeValue,
    errorMessage,
    setScrollDisabled,
}) => {
    const [selected, setSelected] = useState<typeof data>(initSelected);
    const [isCollapse, setIsCollapse] = useState(true);
    const heightAnim = useRef(new Animated.Value(0)).current;

    const toggleDropdown = () => {
        Animated.spring(heightAnim, {
            toValue: !isCollapse ? 0 : Metrics.screenHeight / 3,
            useNativeDriver: false,
            bounciness: 0,
            speed: 14,
        }).start();
        setIsCollapse(!isCollapse);
        setScrollDisabled?.(prevState => !prevState);
    };

    const renderItem: ListRenderItem<string> = useCallback(
        ({ item }) => {
            const isChecked = !!selected.find(el => el === item);

            const addItem = () =>
                setSelected(prevState => {
                    if (!multiple && isChecked) {
                        return prevState;
                    }
                    if (!multiple) {
                        toggleDropdown();
                        return [item];
                    }
                    return isChecked ? prevState.filter(el => el !== item) : [...prevState, item];
                });

            return (
                <StyledTouchable onPress={addItem} customStyle={styles.dropdownItemContainer}>
                    <StyledIcon
                        size={20}
                        source={isChecked ? Images.icons.checkBox.check : Images.icons.checkBox.uncheck}
                    />
                    <StyledText customStyle={styles.dropdownItemText} originValue={item} />
                </StyledTouchable>
            );
        },
        [selected, multiple, toggleDropdown],
    );

    const onRemove = (item: string) => () => setSelected(prevState => prevState.filter(el => el !== item));

    useEffect(() => {
        onChangeValue(selected);
    }, [selected]);

    useEffect(() => {
        if (!initSelected.length && selected.length) setSelected([]);
        if (initSelected.length && !selected.length) setSelected(initSelected);
    }, [initSelected]);

    return (
        <View style={[styles.container, containerStyle]}>
            {!!label && (
                <View style={styles.labelContainer}>
                    <StyledText i18nText={label} customStyle={styles.label} />
                    {required && <StyledText originValue="*" customStyle={styles.required} />}
                </View>
            )}

            <View style={[styles.optionsSelected, !!errorMessage && styles.error]}>
                <ScrollView horizontal>
                    {selected.length ? (
                        <>
                            {selected.map((item, i) => (
                                <Fragment key={i}>
                                    {!multiple ? (
                                        <StyledText
                                            originValue={item}
                                            customStyle={[styles.selectedText, styles.itemText]}
                                        />
                                    ) : (
                                        <View style={styles.selectedItem}>
                                            <StyledText originValue={item} customStyle={styles.selectedText} />

                                            <StyledTouchable
                                                onPress={onRemove(item)}
                                                customStyle={styles.removeWrapper}
                                            >
                                                <StyledIcon source={Images.icons.remove} size={22} />
                                            </StyledTouchable>
                                        </View>
                                    )}
                                </Fragment>
                            ))}
                        </>
                    ) : (
                        <StyledText
                            i18nText={(placeholder || '') as any}
                            customStyle={[styles.placeholder, styles.itemText]}
                        />
                    )}
                </ScrollView>
                <StyledTouchable onPress={toggleDropdown}>
                    <StyledIcon
                        source={isCollapse ? Images.icons.down : Images.icons.up}
                        size={12}
                        customStyle={styles.icon}
                    />
                </StyledTouchable>
            </View>

            <Animated.View style={{ height: heightAnim, overflow: 'hidden' }}>
                <View style={styles.dropdownContainer}>
                    <StyledList data={data} renderItem={renderItem} />
                </View>
            </Animated.View>

            {errorMessage && <StyledText originValue={errorMessage} customStyle={styles.errorMessage} />}
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {},
    labelContainer: {
        flexDirection: 'row',
        marginBottom: '4@vs',
    },
    error: {
        borderColor: Themes.COLORS.borderInputError,
    },
    label: {
        fontSize: '14@ms0.3',
        fontWeight: 'bold',
        color: Themes.COLORS.black,
    },
    required: {
        fontSize: '14@ms0.3',
        fontWeight: 'bold',
        color: 'red',
    },
    optionsSelected: {
        flexDirection: 'row',
        height: '45@s',
        borderRadius: '2@s',
        borderWidth: 1,
        borderColor: Themes.COLORS.grayD1,
        alignItems: 'center',
    },
    icon: {
        marginHorizontal: '18@s',
    },
    dropdownContainer: {
        borderWidth: 1,
        marginTop: '4@vs',
        borderRadius: '2@s',
        borderColor: Themes.COLORS.grayD1,
        flex: 1,
        paddingVertical: '8@vs',
    },
    selectedItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: '8@s',
        backgroundColor: Themes.COLORS.backgroundTab,
        marginLeft: '4@s',
        borderRadius: '3@s',
    },
    selectedText: {
        fontSize: '14@ms0.3',
        fontWeight: 'bold',
        color: Themes.COLORS.black,
        marginRight: '10@s',
    },
    removeWrapper: {
        paddingVertical: '8@s',
    },
    dropdownItemContainer: {
        paddingVertical: '8@vs',
        paddingHorizontal: '16@s',
        flexDirection: 'row',
    },
    dropdownItemText: {
        fontSize: '14@s',
        marginLeft: '8@s',
    },
    placeholder: {
        fontSize: '14@ms0.3',
        color: Themes.COLORS.grayD1,
    },
    itemText: {
        marginLeft: '16@s',
    },
    errorMessage: {
        fontSize: 12,
        color: Themes.COLORS.borderInputError,
        marginTop: 5,
    },
});

export default StyledDropdown;
