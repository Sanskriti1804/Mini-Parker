import React from 'react';
import { Text, View, Image } from "react-native";
import AppButton from "@/app/components/AppButton";
import { icons } from "@/app/constants";

const  OAuth= () => {
    const handleGoogleSignIn = async () => {};

  return (
    <View className="flex flex-row justify-center items-center mt-4 gap-x-3">
        <View className="flex-1 h-[1px] bg-general-100">
            <Text className="text-lg">Or</Text>
        </View>

        <AppButton title="Log in with Google"
                   className="mt-5 w-full shadow-sm"
                   bgColor="outline"
                   textColor="secondary"
                   onPress={handleGoogleSignIn}
                   IconLeft={() => (
                       <Image source={icons.google} resizeMode="contain" className="w-5 h-5 mx-2" />
                   )} />
    </View>
  );
};

export default OAuth;