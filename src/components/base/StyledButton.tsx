import React, { FunctionComponent } from 'react';
import { StyleProp, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { StyledText, StyledTouchable } from '.';

interface StyledButtonProps {
    title: string;
    customStyle?: StyleProp<ViewStyle>;
    customStyleText?: StyleProp<TextStyle>;
    onPress(params?: any): void;
    onLongPress?(): void;
    disabled?: boolean;
}

const StyledButton: FunctionComponent<StyledButtonProps> = (props: StyledButtonProps) => {
    const { title, customStyle, onPress, customStyleText, onLongPress, disabled = false } = props;
    return (
        <StyledTouchable
            customStyle={[styles.container, customStyle]}
            onPress={onPress}
            onLongPress={onLongPress}
            disabled={disabled}
        >
            <StyledText originValue={title} customStyle={customStyleText} />
        </StyledTouchable>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        width: '76%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 22,
        backgroundColor: '#29B6F6',
        marginTop: 30,
    },
});

export default StyledButton;
