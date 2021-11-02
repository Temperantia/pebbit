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
  androidStandaloneAppClientId:
    "876715407348-atebc1ufg3vjuf794gg4i5jl7p47mdae.apps.googleusercontent.com",
  iosClientId:
    "876715407348-e3i42a85ib2d18peimbjppfchj83pjru.apps.googleusercontent.com",
  iosStandaloneAppClientId:
    "876715407348-2uon6puq90m7b5as4nffa7e6nbpqkofk.apps.googleusercontent.com",
  scopes: ["email"],
};

type NewUser = {
  email: string | null;
  id: string;
  phone: string | null;
};

type AuthContextData = {
  token: string | null;
  user: User | null;
  authUser: firebase.User | null;
  newUser: NewUser | null;
  loading: boolean;
  signInWithGoogle(): Promise<void>;
  signInWithEmail(email: string, password: string): Promise<void>;
  signOut(): void;
  register(username: string, address: Address): void;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: FC = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [authUser, setAuthUser] = useState<firebase.User | null>(null);
  const [newUser, setNewUser] = useState<NewUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  let unsubscribe: () => void;

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      setAuthUser(authUser);
      if (unsubscribe) {
        unsubscribe();
      }
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
      } catch (error: any) {
        if (error.code === "auth/wrong-password") {
          alert("Incorrect credentials");
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
    // todo token
    try {
      const data = await registerForPushNotifications();
      if (data) {
        setToken(data);
      }
    } catch (error) {
      setToken("ExponentPushToken[l1EyP6FP0V5CgKsNke0DbY]");
    }
    setUser(user);
  };

  const signOut = async () => {
    await auth.signOut();
    setToken(null);
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
        authUser,
        newUser,
        loading,
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
