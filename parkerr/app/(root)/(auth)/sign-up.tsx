import {Image, Pressable, ScrollView, Text, TextInput, View, StyleSheet} from "react-native";
import {icons, images} from "@/app/constants";
import InputField from "@/app/components/InputField";
import {useState} from "react";
import AppButton from "@/app/components/AppButton";
import OAuth from "@/app/components/OAuth";
import {useAuth, useSignUp} from "@clerk/expo";
import {Link, useRouter} from "expo-router";


const Signup = () => {
    //fetchStatus - checks if the clerk request is currently riunning
    const {signUp, errors, fetchStatus} = useSignUp();
    const {isSignedIn} = useAuth();
    const router = useRouter();

    const [form, setForm] = useState({
        name: "",
        emailAddress: "",
        password: "",
    });

    //verification code - send to the user's email
    const [code, setCode] = useState("");

    const handleSignUp = async () => {
        const {error} = await signUp.password({
            emailAddress: form.emailAddress,
            password: form.password,
            firstName: form.name || undefined,
        });

        if (error) {
            console.error(JSON.stringify(error, null, 2));
            return;
        }

        //account creation was succssful - send an email containing the verification code
        //error : sendError - (destructuring + renaming) - means - const sendError = result.error(take the error prop and store it in a var)
        const {error: sendError} = await signUp.verifications.sendEmailCode();

        if (sendError) {    //failed to send code
            console.error(JSON.stringify(sendError, null, 2));
            return;
        }

        console.log("Verification code sent!");
    };

    //verify the email
    const handleVerify = async () => {
        const {error} = await signUp.verifications.verifyEmailCode({
            code
        });

        if (error) {
            console.error(JSON.stringify(error, null, 2));
            return;
        }

        //finalize the signup
        const {error: finalizeError} = await signUp.finalize();

        if (finalizeError) {
            console.error(JSON.stringify(finalizeError, null, 2));
            return;
        }

        router.replace("/(root)/(tabs)/home");
    };

    if(signUp.status === "complete" || isSignedIn) {
        return  null
    }

    //email verification screens
    if(signUp.status === "missing_requirements" && signUp.unverifiedFields.includes('email_address') && signUp.missingFields.length === 0) {
        return (
            <View style={styles.container}>
                <Text  style={styles.title}>
                    Verify your account
                </Text>
                <TextInput
                    style={styles.input}
                    value={code}
                    placeholder="Enter your verification code"
                    placeholderTextColor="#666666"
                    onChangeText={(code) => setCode(code)}
                    keyboardType="numeric"
                />
                {errors.fields.code && (
                    <Text style={styles.error}>{errors.fields.code.message}</Text>
                )}
                <Pressable
                    style={({ pressed }) => [
                        styles.button,
                        fetchStatus === 'fetching' && styles.buttonDisabled,
                        pressed && styles.buttonPressed,
                    ]}
                    onPress={handleVerify}
                    disabled={fetchStatus === 'fetching'}
                >
                    <Text style={styles.buttonText}>Verify</Text>
                </Pressable>
                <Pressable
                    style={({ pressed }) => [styles.secondaryButton, pressed && styles.buttonPressed]}
                    onPress={() => signUp.verifications.sendEmailCode()}
                >
                    <Text style={styles.secondaryButtonText}>I need a new code</Text>
                </Pressable>
            </View>
        )
    }


    return (
        <ScrollView className="flex-1 bg-white">
            <View className="flex-1 bg-white">
                <View className="relative w-full h-[250px]">
                    <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />

                    <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
                        Create Your Account
                    </Text>

                    <InputField
                        label="Name"
                        placeholder="Enter your name"
                        icon={icons.person}
                        value={form.name}
                        onChangeText={(value) =>
                            setForm({
                                ...form,
                                name: value
                            })
                        }
                    />

                    <InputField
                        label="Email"
                        placeholder="Enter your email"
                        icon={icons.email}
                        value={form.emailAddress}
                        onChangeText={(value) =>
                            setForm({
                                ...form,
                                emailAddress: value
                            })
                        }
                    />
                    {errors.fields.emailAddress && (
                        <Text style={styles.error}>{errors.fields.emailAddress.message}</Text>
                    )}
                    <InputField
                        label="Password"
                        placeholder="Enter your password"
                        secureTextEntry={true}
                        icon={icons.lock}
                        value={form.password}
                        onChangeText={(value) =>
                            setForm({
                                ...form,
                                password: value
                            })
                        }
                    />
                    {errors.fields.password && (
                        <Text style={styles.error}>{errors.fields.password.message}</Text>
                    )}

                    <AppButton
                        title="Sign Up"
                        onPress={handleSignUp}
                        className="mt-5"
                        style={({pressed}) => [
                            styles.button,
                            (!form.emailAddress || !form.password || fetchStatus === 'fetching') && styles.buttonDisabled,
                            pressed && styles.buttonPressed,
                        ]}

                    />

                    {/* O Auth */}
                    <OAuth/>

                    <Link
                        href="/sign-in"
                        className="text-lg text-center text-general-200 mt-10"
                    >
                        <Text>Already have an account?</Text>
                        <Text className="text-primary-500">Log In</Text>
                    </Link>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        gap: 12,
    },
    title: {
        marginBottom: 8,
    },
    label: {
        fontWeight: '600',
        fontSize: 14,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#0a7ea4',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 8,
    },
    buttonPressed: {
        opacity: 0.7,
    },
    buttonDisabled: {
        opacity: 0.5,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
    },
    secondaryButton: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 8,
    },
    secondaryButtonText: {
        color: '#0a7ea4',
        fontWeight: '600',
    },
    linkContainer: {
        flexDirection: 'row',
        gap: 4,
        marginTop: 12,
        alignItems: 'center',
    },
    error: {
        color: '#d32f2f',
        fontSize: 12,
        marginTop: -8,
    },
    debug: {
        fontSize: 10,
        opacity: 0.5,
        marginTop: 8,
    },
})

export default Signup;