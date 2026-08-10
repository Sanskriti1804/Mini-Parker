import {
    Image, KeyboardAvoidingView, Platform,
    Pressable,
    PressableProps,
    StyleProp,
    Text,
    TextInputProps,
    TextStyle,
    View,
    ViewStyle
} from "react-native";
import React from "react";

interface InputFieldProps extends TextInputProps{
    label? : string,
    icon? : any,
    secureTextEntry?: boolean,
    labelStyle?: StyleProp<TextStyle>,
    containerStyle?: StyleProp<ViewStyle>,
    inputStyle?: StyleProp<TextStyle>,
    iconStyle?: StyleProp<ViewStyle>,
    className?: string
}

const InputField = ({
    label, icon, secureTextEntry = false, labelStyle, inputStyle, containerStyle, iconStyle, className, style, ...props
} : InputFieldProps) => {
    return(
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style = {{flex : 1}} >
            <InputField >
                <Text className={`text-lg font-JakartaSemiBold mb-3 ${labelStyle}`}>{label}</Text>
                <View className={`flex flex-row justify-start items-center relative bg-neutral-100 rounded-full border border-neutral-100 focus:border-primary-500  ${containerStyle}`}>
                    {icon && (<Image source={icon} className={`w-6 h-6 ml-4 ${iconStyle}`}/>)}
                </View>
            </InputField>
        </KeyboardAvoidingView>

    )
}

export  default  InputField;