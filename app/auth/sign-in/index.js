import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "./../../../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../configs/firebaseConfig";

import Icon from "react-native-vector-icons/MaterialIcons";

export default function SignIn() {
  const navigation = useNavigation();
  const router = useRouter();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [secureText, setSecureText] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const OnSignIn = () => {
    if (!email || !password) {
      ToastAndroid.show("Please enter all details", ToastAndroid.BOTTOM);
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        router.replace("/mytrip");
        //console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage, errorCode);

        if (errorCode == "auth/invalid-email") {
          ToastAndroid.show("Invalid Email", ToastAndroid.BOTTOM);
        } else if (errorCode == "auth/invalid-credential") {
          ToastAndroid.show("Invalid Password", ToastAndroid.BOTTOM);
        }
      });
  };

  return (
    <View
      style={{
        padding: 25,
        paddingTop: 30,
        backgroundColor: Colors.WHITE,
        height: "100%",
      }}
    >
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="chevron-back-outline" size={24} color="black" />
      </TouchableOpacity>

      <Text
        style={{
          paddingTop: 20,
          fontFamily: "outfit-bold",
          fontSize: 30,
          textAlign: "center",
        }}
      >
        Let's Sign You In
      </Text>

      <Text
        style={{
          fontFamily: "outfit",
          fontSize: 30,
          color: Colors.GREY,
          textAlign: "center",
          marginTop: 20,
        }}
      >
        Welcome Back
      </Text>

      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 27,
          color: Colors.PRIMARY,
          textAlign: "center",
          marginTop: 20,
        }}
      >
        Where YOU have been ?
      </Text>

      <View
        style={{
          marginTop: 45,
        }}
      >
        {/* email */}
        <Text
          style={{
            fontFamily: "outfit-bold",
            padding: 5,
          }}
        >
          Email
        </Text>
        <TextInput
          style={styles.input}
          placeholder="example@gmail.com"
          onChangeText={(value) => setEmail(value)}
        ></TextInput>

        {/* Password */}
        <Text
          style={{
            fontFamily: "outfit-bold",
            marginTop: 20,
            padding: 5,
          }}
        >
          Password
        </Text>
          <View style={styles.inputContainer}>
        <TextInput
          secureTextEntry={secureText}
          style={styles.input}
          placeholder="* * * * * * * * * *"
          onChangeText={(value) => setPassword(value)}
        ></TextInput>

        <TouchableOpacity style={styles.icon} onPress={() => setSecureText(!secureText)}>
          <Icon
            name={secureText ? "visibility-off" : "visibility"}
            size={20}
            color="gray"
          />
        </TouchableOpacity>
        </View>

      </View>

      <TouchableOpacity
        onPress={OnSignIn}
        style={{
          marginTop: 40,
          padding: 20,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 99,
        }}
      >
        <Text
          style={{
            color: Colors.WHITE,
            textAlign: "center",
            fontFamily: "outfit-medium",
          }}
        >
          Sign In
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.replace("auth/sign-up")}
        style={{
          marginTop: 20,
          padding: 20,
          borderRadius: 99,
          borderWidth: 1,
          borderColor: Colors.PRIMARY,
        }}
      >
        <Text
          style={{
            color: Colors.PRIMARY,
            textAlign: "center",
            fontFamily: "outfit-medium",
          }}
        >
          Create New Account
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 20,
    borderWidth: 1,
    borderRadius: 99,
    borderColor: Colors.GREY,
    fontFamily: "outfit",
    width: "100%",
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    position: 'absolute',
    right: 20,
  },
});
