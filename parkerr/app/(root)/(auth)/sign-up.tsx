import {Animated, Image, Text, View} from "react-native";
import {icons, images} from "@/app/constants";
import ScrollView = Animated.ScrollView;
import InputField from "@/app/components/InputField";
import {useState} from "react";
import AppButton from "@/app/components/AppButton";
import {Link} from "expo-router";
import OAuth from "@/app/components/OAuth";

const Signup = () => {
    const [form, setForm] = useState({
        name : "",
        email: "",
        password: "",
    })

    const  onSignupPress = async () => {}
  return (
        <ScrollView className="flex-1 bg-white">
            <View className="flex-1 bg-white">
                <View className="relative w-full h-[250px]">
                    <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
                    <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
                        Create Your Account
                    </Text>
                    <InputField label="Name" placeholder="Enter your name" icon={icons.person} value={form.name} onChangeText={(value) => setForm({
                        ...form,
                        name : value
                    })} />
                    <InputField label="Email" placeholder="Enter your email" icon={icons.email} value={form.email} onChangeText={(value) => setForm({
                        ...form,
                        email : value
                    })} />
                    <InputField label="Password" placeholder="Enter your password" secureTextEntry={true} icon={icons.lock} value={form.password} onChangeText={(value) => setForm({
                        ...form,
                        password : value
                    })} />

                    <AppButton title="Sign Up" onPress={onSignupPress} className="mt-5" />
                    
                {/* O Auth*/}
                    <OAuth/>
                    
                    <Link href="/sign-in" className="text-lg text-center text-general-200 mt-10">
                        <Text>Already have an account?</Text>
                        <Text className="text-primary-500">Log In</Text>
                    </Link>
                </View>
            </View>
        </ScrollView>
  );
};

export default Signup;
