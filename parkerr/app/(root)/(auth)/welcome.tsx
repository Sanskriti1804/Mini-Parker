import { router } from "expo-router";
import { useState } from "react";
import { Dimensions, Image, Pressable, Text, View } from "react-native";
import { Carousel } from "react-native-reanimated-carousel";
import { SafeAreaView } from "react-native-safe-area-context";
import { data, onboarding } from "@/app/constants";
import AppButton from "@/app/components/AppButton";

const { width, height } = Dimensions.get("window");

type OnboardingItem = (typeof onboarding)[number];

export default function Welcome() {
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === onboarding.length - 1;

  return (
    <SafeAreaView className="flex h-full items-center justify-between bg-white ">
      <Pressable
        className="w-full flex-row items-end justify-end p-5"
        onPress={() => {
          router.replace("/(root)/(auth)/sign-up");
        }}
      >
        <Text className="font-JakartaBold text-md text-black">Skip</Text>
      </Pressable>

      <Carousel
        style={{ width, height: height * 0.7 }}
        data={data.onboarding}
        loop={false}
        onSnapToItem={(index) => setActiveIndex(index)}
        renderItem={({ item }: { item: OnboardingItem }) => (
          <View className="flex-1 items-center justify-center p-5">
            <Image
              source={item.image}
              className="h-[300px] w-full"
              resizeMode="contain"
            />

            <View className="mt-10 w-full flex-row items-center justify-center">
              <Text className="mx-10 text-center text-3xl font-JakartaBold text-black">
                {item.title}
              </Text>
            </View>

            <Text className="mx-10 mt-3 text-center text-md font-JakartaMedium text-secondary-700">
              {item.description}
            </Text>
          </View>
        )}
      />

      <AppButton title={
          isLastSlide ? "Get Started" : "Next"
      } onPress={() => isLastSlide ? router.replace('/(root)/(auth)/sign-up' ) : setActiveIndex(activeIndex)}
                 className="w-5/6 px-8 "/>


      <View className="mb-10 flex-row items-center justify-center">
        {data.onboarding.map((_, index) => (
          <View
            key={index}
            className={`mx-1 h-1 rounded-full ${
              activeIndex === index
                ? "w-8 bg-primary-500"
                : "w-8 bg-general-100"
            }`}
          />
        ))}
      </View>
    </SafeAreaView>
  );
}
