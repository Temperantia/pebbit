import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from "react";
import firebase from "firebase";
import * as GoogleAuthentication from "expo-google-app-auth";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import * as AppleAuthentication from "expo-apple-authentication";
import { useTranslation } from "react-i18next";

import { auth, userCollection } from "../firebase";
import { Address, User } from "../types";

const google = {
  clientId:
    "876715407348-atebc1ufg3vjuf794gg4i5jl7p47mdae.apps.googleusercontent.com",
  androidClientId:
    "876715407348-j2ai3kjuibqr48cs6l1kkhgbk0r0qlj1.apps.googleusercontent.com",
  androidStandaloneAppClientId:
    "876715407348-atebc1ufg3vjuf794gg4i5jl7p47mdae.apps.googleusercontent.com",
  scopes: ["email"],
};

type NewUser = {
  email: string | null;
  id: string;
  phone: string | null;
};

type AuthContextData = {
  user: User | null;
  authUser: firebase.User | null;
  newUser: NewUser | null;
  loading: boolean;
  signInWithGoogle(): Promise<void>;
  signInWithApple(): Promise<void>;
  signInWithEmail(email: string, password: string): Promise<void>;
  signOut(): void;
  register(username: string, address: Address): Promise<void>;
  saveProfile(data: {
    email: string;
    phone: string;
    address: Address;
    password: string;
    newPassword: string;
  }): Promise<void>;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: FC = ({ children }) => {
  const { t } = useTranslation(["errors"]);
  const [user, setUser] = useState<User | null>(null);
  const [authUser, setAuthUser] = useState<firebase.User | null>(null);
  const [newUser, setNewUser] = useState<NewUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  let unsubscribe: () => void;

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      setAuthUser(authUser);
      if (authUser) {
        const { email, uid, phoneNumber } = authUser;
        unsubscribe = userCollection.doc(uid).onSnapshot(async (doc) => {
          if (!doc.exists) {
            setNewUser({ email, id: uid, phone: phoneNumber });
            setLoading(false);
            return;
          }

          const data = doc.data();
          if (data) {
            await signIn(data);
          }

          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    });
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const signInWithGoogle = async () => {
    const result = await GoogleAuthentication.logInAsync(google);
    if (result.type === "success") {
      const { idToken, accessToken } = result;
      const credentials = firebase.auth.GoogleAuthProvider.credential(
        idToken,
        accessToken
      );

      await auth.signInWithCredential(credentials);
    }
  };

  const signInWithApple = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      const { identityToken } = credential;
      if (!identityToken) {
        return;
      }
      const provider = new firebase.auth.OAuthProvider("apple.com");
      const authCredential = provider.credential({
        idToken: identityToken,
      });

      await auth.signInWithCredential(authCredential);
    } catch (error) {
      console.error(error);
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      await auth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      try {
        await auth.signInWithEmailAndPassword(email, password);
      } catch (error: any) {
        if (error.code === "auth/wrong-password") {
          alert(t("errors:wrongCredentials"));
        }
      }
    }
  };

  const signIn = async (user: User) => {
    const ads = Object.entries(user.ads).map(([id, ad]) => ({
      ...ad,
      id,
    }));
    user.buyingList = ads.filter(({ userId }) => userId !== user.id);
    user.sellingList = ads.filter(({ userId }) => userId === user.id);
    user.messagingList = ads.filter(
      ({ messages, status }) =>
        !!messages && (status === "paid" || status === "sent")
    );
    user.history = ads.filter(
      ({ userId, status }) =>
        status === "complete" || (userId !== user.id && status === "received")
    );
    // emulator crashes on that
    try {
      await registerForPushNotifications(user.id);
    } catch (error) {}
    setUser(user);
  };

  const signOut = async () => {
    await auth.signOut();
    setUser(null);
    setNewUser(null);
  };

  const register = async (username: string, address: Address) => {
    if (!newUser) {
      return;
    }
    const data = { ...newUser, username, address, ads: {} };
    await userCollection.doc(newUser.id).set(data);
    signIn(data);
  };

  const registerForPushNotifications = async (id: string) => {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert(t("errors:notificationToken"));
      return;
    }
    const data = (await Notifications.getExpoPushTokenAsync()).data;

    await userCollection.doc(id).update({ token: data });

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return data;
  };

  const saveProfile = async ({
    email,
    phone,
    address,
    password,
    newPassword,
  }: {
    email: string;
    phone: string;
    address: Address;
    password: string;
    newPassword: string;
  }) => {
    if (!user) {
      return;
    }
    try {
      if (user.email && email !== user.email) {
        try {
          await auth.signInWithEmailAndPassword(user.email, password);
        } catch (error) {
          alert(t("errors:wrongPassword"));
          return;
        }
        await authUser?.updateEmail(email);
      }
      if (user.email && password && newPassword) {
        try {
          await auth.signInWithEmailAndPassword(user.email, password);
        } catch (error) {
          alert(t("errors:wrongPassword"));
          return;
        }
        await authUser?.updatePassword(newPassword);
      }
      await userCollection.doc(user?.id).update({ email, phone, address });
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authUser,
        newUser,
        loading,
        signInWithGoogle,
        signInWithApple,
        signInWithEmail,
        signOut,
        register,
        saveProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default () => useContext(AuthContext);
