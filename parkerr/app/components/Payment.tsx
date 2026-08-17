import AppButton from "@/app/components/AppButton";
import { fetchAPI } from "@/app/lib/fetch";
import { useStripe } from "@stripe/stripe-react-native";
import { useState } from "react";
import { Alert } from "react-native";

// Payment sheet: create intent via existing /(stripe)/create API, then present
const Payment = ({
  fullName,
  email,
  amount,
  driverId,
  rideTime,
}: {
  fullName: string;
  email: string;
  amount: string;
  driverId: number;
  rideTime: number;
}) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [success, setSuccess] = useState(false);

  const initializePaymentSheet = async () => {
    // Route file: (api)/(stripe)/create+api.ts → /create
    const { paymentIntent, ephemeralKey, customer } = await fetchAPI(
      "/create",
      {
        method: "POST",
        body: JSON.stringify({
          name: fullName || email.split("@")[0],
          email,
          amount,
        }),
      },
    );

    const { error } = await initPaymentSheet({
      merchantDisplayName: "Parker, Inc.",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey.secret,
      paymentIntentClientSecret: paymentIntent.client_secret,
      returnURL: "parkerr://book-ride",
    });

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    }
  };

  const openPaymentSheet = async () => {
    await initializePaymentSheet();

    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      setSuccess(true);
      Alert.alert("Success", "Your order is confirmed!");
    }
  };

  return (
    <AppButton
      title="Confirm Ride"
      className="my-10"
      onPress={openPaymentSheet}
    />
  );
};

export default Payment;
