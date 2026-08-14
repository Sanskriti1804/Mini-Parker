import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

interface InputFieldProps extends TextInputProps {
  label?: string;
  icon?: any;
  secureTextEntry?: boolean;
  labelStyle?: string;
  containerStyle?: string;
  inputStyle?: string;
  iconStyle?: string;
  className?: string;
}

const InputField = ({
  label,
  icon,
  secureTextEntry = false,
  labelStyle,
  inputStyle,
  containerStyle,
  iconStyle,
  className,
  ...props
}: InputFieldProps) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View className={`my-2 w-full ${className ?? ""}`}>
        <Text className={`mb-3 text-lg font-JakartaSemiBold ${labelStyle ?? ""}`}>
          {label}
        </Text>
        <View
          className={`relative flex flex-row items-center justify-start rounded-full border border-neutral-100 bg-neutral-100 ${containerStyle ?? ""}`}
        >
          {icon && (
            <Image source={icon} className={`ml-4 h-6 w-6 ${iconStyle ?? ""}`} />
          )}
          <TextInput
            className={`flex-1 rounded-full p-4 text-[15px] font-JakartaSemiBold text-left ${inputStyle ?? ""}`}
            secureTextEntry={secureTextEntry}
            placeholderTextColor="#858585"
            {...props}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default InputField;
