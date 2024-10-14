import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useState } from "react";
import { Alert, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useAtom } from "jotai";
import { userAtom } from "../store/userAtom";
import { useMutation } from "@tanstack/react-query";
import { signupGoogle } from "../api";

WebBrowser.maybeCompleteAuthSession();

export const GoogleOAuth = () => {
  const [googleUserInfo, setGoogleUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useAtom(userAtom);

  const mutation = useMutation({
    mutationFn: (data) => signupGoogle(data),
    onSuccess: (data) => {
      data.isAlreadyUser
        ? null
        : Alert.alert("회원가입 완료", "회원가입 되셨습니다.", [
            { text: "확인" },
          ]);
    },
  });

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId:
      "811679640084-jbua3dv3unusfvs3517gmp45eh89i9q7.apps.googleusercontent.com",
    androidClientId:
      "811679640084-11qhfn2nce1tehqmsofhafjs37hf7t28.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success" && !loading) {
      handleSignInWithGoogle();
    }
  }, [response]);

  const handleSignInWithGoogle = async () => {
    if (loading) return;
    const user = await AsyncStorage.getItem("@user");

    if (user) {
      setGoogleUserInfo(JSON.parse(user));
      return;
    }
    setLoading(true);

    if (response?.type === "success") {
      await getUserInfo(response.authentication?.accessToken);
    }
    setLoading(false);
  };

  const getUserInfo = async (token: string | undefined) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // 서버에 구글 유저 정보 보내서 저장하기~~~
      const userInfoResponse = await response.json();
      mutation.mutate(userInfoResponse);
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("@user", JSON.stringify(userInfoResponse));
      setGoogleUserInfo(userInfoResponse);
      setUser((prev) => ({
        ...prev,
        token: token,
        isAuthenticated: true,
        authenticate: (token: string) => {
          setUser((prev) => ({
            ...prev,
            token,
            isAuthenticated: true,
          }));
        },
      }));
    } catch (e) {
      console.log(e);
    }
  };

  const handleLogoutWithGoogle = async () => {
    await AsyncStorage.removeItem("@user");
    setGoogleUserInfo(null);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.image}
        activeOpacity={0.6}
        onPress={() => {
          promptAsync();
        }}
      >
        <Image
          resizeMode={"contain"}
          source={require("../assets/images/smallGoogle.png")}
        />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    marginTop: 2,
  },
});
