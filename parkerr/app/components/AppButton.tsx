import {Pressable, PressableProps, Text} from "react-native";
import React from "react";

type  BgVariant =  "primary" | "secondary" | "danger" | "success" |"outline";
type TextVariant = "secondary" | "default";

const getBgVariantStyle = (variant: BgVariant) => {
    switch (variant) {
        case  "secondary" :
            return "bg-gray-500"
        case  "danger" :
            return "bg-red-500"
        case  "success" :
            return "bg-green-500"
        case  "outline" :
            return "bg-transparent border-neutral-300-[0.5px]"
        default :
            return "bg-[#0286ff]"
    }
}

const getTextVariantStyle = (variant: TextVariant) => {
    switch (variant) {
        case  "secondary" :
            return "text-gray-500"
        case  "default" :
            return "text-white"
        default : return "text-white";
    }
}

interface AppButtonProps  extends PressableProps {
    title: string,
    bgColor? : BgVariant,
    textColor? : "secondary" |"default",
    IconLeft? : React.ComponentType<{size? : number}>
    IconRight? : React.ComponentType<{size? : number}>
    className? : string
}

const AppButton = ({
    title,
    bgColor = "primary",
    textColor = "default",
    IconLeft,
    IconRight,
    className,
    ...props
} : AppButtonProps) => {
    return (
        <Pressable
            {...props}
            className={`w-full flex-row items-center justify-center rounded-full p-4 shadow-md shadow-neutral-400/70  ${getBgVariantStyle(bgColor)}  
            ${className ?? ""}`}
        >
            {IconLeft && <IconLeft />}
            <Text className={getTextVariantStyle(textColor)}>{title}</Text>
            {IconRight && <IconRight />}
        </Pressable>
    )
}

export default  AppButton;