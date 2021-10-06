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

import { auth, userCollection } from "../firebase";
import { Address, User } from "../types";

const google = {
  androidClientId:
    "876715407348-atebc1ufg3vjuf794gg4i5jl7p47mdae.apps.googleusercontent.com",
  iosClientId:
    "876715407348-e3i42a85ib2d18peimbjppfchj83pjru.apps.googleusercontent.com",
  iosStandaloneAppClientId:
    "876715407348-2uon6puq90m7b5as4nffa7e6nbpqkofk.apps.googleusercontent.com",
  scopes: ["email"],
};

type AuthContextData = {
  token: string;
  user: User;
  newUser: User;
  signInWithGoogle(): Promise<void>;
  signInWithEmail(email: string, password: string): Promise<void>;
  signOut(): void;
  register(username: string, address: Address): void;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: FC = ({ children }) => {
  const [token, setToken] = useState<string>();
  const [user, setUser] = useState<User>();
  const [newUser, setNewUser] = useState<any>();

  useEffect(() => {
    auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        const { email, uid } = authUser;
        const doc = await userCollection.doc(uid).get();
        if (!doc.exists) {
          setNewUser({ email, id: uid });
          return;
        }
        await signIn(doc.data());
      }
    });
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

  const signInWithEmail = async (email: string, password: string) => {
    try {
      await auth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      try {
        await auth.signInWithEmailAndPassword(email, password);
      } catch (error) {
        if (error.code === "auth/wrong-password") {
          alert("Incorrect credentials");
        }
      }
    }
  };

  const signIn = async (user: User) => {
    // todo token
    try {
      const data = await registerForPushNotifications();
      setToken(data);
    } catch (error) {}
    setUser(user);
  };

  const signOut = async () => {
    await auth.signOut();
    setToken(null);
    setUser(null);
    setNewUser(null);
  };

  const register = async (username: string, address: Address) => {
    const data = { ...newUser, username, address, orders: [], ads: [] };
    await userCollection.doc(newUser.id).set(data);
    signIn(data);
  };

  const registerForPushNotifications = async () => {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    const data = (await Notifications.getExpoPushTokenAsync()).data;

    console.log(data);

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

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        newUser,
        signInWithGoogle,
        signInWithEmail,
        signOut,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default () => useContext(AuthContext);
