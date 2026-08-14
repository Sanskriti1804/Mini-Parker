import {icons, images} from "@/app/constants";
import InputField from "@/app/components/InputField";
import React, {useState} from "react";
import AppButton from "@/app/components/AppButton";
import OAuth from "@/app/components/OAuth";
import { useSignIn } from '@clerk/expo'
import { type Href, Link, useRouter } from 'expo-router'
import { Pressable, StyleSheet, TextInput, View, ScrollView, Image, Text } from 'react-native'

const Signin = () => {
    const { signIn, errors, fetchStatus } = useSignIn()
    const router = useRouter()

    const [code, setCode] = React.useState('')

    const [form, setForm] = useState({
        emailAddress: "",
        password: "",
    })

    const  handleSubmit = async () => {
        const { error } = await signIn.password({
            emailAddress: form.emailAddress,
            password: form.password,
        })
        if (error) {
            console.error(JSON.stringify(error, null, 2))
            return
        }

        if (signIn.status === 'complete') {
            await signIn.finalize({
                //clerk - curr sess and a helper fnn - to prepare a current url for navigation
                navigate: ({ session, decorateUrl }) => {
                    // Handle session tasks
                    if (session?.currentTask) {
                        console.log(session?.currentTask)
                        return
                    }

                    // If no session tasks, navigate the signed-in user to the home page
                    const url = decorateUrl('/(root)/(tabs)/home')
                    //if url - for browser - navigate to browser
                    if (url.startsWith('http')) {
                        window.location.href = url
                    } else {
                        router.replace(url as Href)
                    }
                },
            })
        } else if (signIn.status === 'needs_client_trust') {
            await signIn.mfa.sendEmailCode()
        } else {
            // Check why the sign-in is not complete
            console.error('Sign-in attempt not complete:', signIn)
        }
    }

const handleVerify = async () => {
    const { error } = await signIn.mfa.verifyEmailCode({ code })
    if (error) {
        console.error(JSON.stringify(error, null, 2))
        return
    }

    if (signIn.status === 'complete') {
        await signIn.finalize({
            navigate: ({ session, decorateUrl }) => {
                if (session?.currentTask) {
                    console.log(session?.currentTask)
                    return
                }

                const url = decorateUrl('/(root)/(tabs)/home')
                if (url.startsWith('http')) {
                    window.location.href = url
                } else {
                    router.replace(url as Href)
                }
            },
        })
    } else {
        console.error('Sign-in attempt not complete:', signIn)
    }
}

if (signIn.status === 'needs_client_trust') {
    return (
        <View style={styles.container}>
            <Text  style={[styles.title, { fontSize: 24, fontWeight: 'bold' }]}>
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
                onPress={() => signIn.mfa.sendEmailCode()}
            >
                <Text style={styles.secondaryButtonText}>I need a new code</Text>
            </Pressable>
            <Pressable
                style={({ pressed }) => [styles.secondaryButton, pressed && styles.buttonPressed]}
                onPress={() => signIn.reset()}
            >
                <Text style={styles.secondaryButtonText}>Start over</Text>
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
                        Welcome Back
                    </Text>

                    <InputField label="Email" placeholder="Enter your email" icon={icons.email} value={form.emailAddress} onChangeText={(value) => setForm({
                        ...form,
                        emailAddress : value
                    })} />
                    {errors.fields.identifier && (
                        <Text style={styles.error}>{errors.fields.identifier.message}</Text>
                    )}

                    <InputField label="Password" placeholder="Enter your password" secureTextEntry={true} icon={icons.lock} value={form.password} onChangeText={(value) => setForm({
                        ...form,
                        password : value
                    })} />
                    {errors.fields.password && (
                        <Text style={styles.error}>{errors.fields.password.message}</Text>
                    )}


                    <AppButton
                        style={({ pressed }) => [
                            styles.button,
                            (!form.emailAddress || !form.password || fetchStatus === 'fetching') && styles.buttonDisabled,
                            pressed && styles.buttonPressed,
                        ]}
                        title="Sign In" onPress={handleSubmit} className="mt-5" />

                    {/* O Auth*/}
                    <OAuth/>

                    <Link href="/sign-up" className="text-lg text-center text-general-200 mt-10">
                        <Text>Do not have an account? </Text>
                        <Text className="text-primary-500">Sign Up</Text>
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

export default Signin;
