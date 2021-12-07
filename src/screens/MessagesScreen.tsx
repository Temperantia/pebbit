import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useNavigation } from "@react-navigation/core";
import { StackScreenProps } from "@react-navigation/stack";
import { useForm } from "react-hook-form";

import tw from "../tailwind";
import Icon from "../components/core/Icon";
import { ExchangeParamList, User } from "../types";
import ScreenLoading from "../components/core/ScreenLoading";
import useAuth from "../hooks/useAuth";
import AdLineMessaging from "../components/lines/AdLineMessaging";
import TextInput from "../components/core/TextInput";
import { request, userCollection } from "../firebase";
import tailwindConfig from "../../tailwind.config";
import { format } from "date-fns";
import { keyboardVerticalOffset } from "../constants/Layout";

const MessagesScreen = ({
  route: {
    params: { id },
  },
}: StackScreenProps<ExchangeParamList, "MessagesScreen">) => {
  const { user } = useAuth();
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      content: "",
    },
  });
  const { goBack } = useNavigation();
  const [loading, setLoading] = useState<boolean>(false);
  const flatListRef = useRef<FlatList>(null);
  const [userData, dataLoading] = useDocumentData<User>(
    userCollection.doc(user?.id),
    {
      idField: "id",
    }
  );
  const ad = useMemo(() => userData?.ads[id], [userData]);

  const onBack = useCallback(() => {
    goBack();
  }, [goBack]);

  const onSend = useCallback(
    handleSubmit(async ({ content }) => {
      setLoading(true);
      await request("message", { content, id });
      reset();
      setLoading(false);
    }),
    [handleSubmit, request, setLoading, id, reset]
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <ScreenLoading loading={dataLoading}>
        {ad && (
          <View style={tw("h-full")}>
            <TouchableOpacity
              style={tw("my-5 flex-row items-center mx-3")}
              onPress={onBack}
            >
              <Icon size={16} name="small/16/000000/back.png" />
              <Text
                style={[
                  tw("ml-2 text-red-main"),
                  { fontFamily: "poppins-medium" },
                ]}
              >
                Back to Messages
              </Text>
            </TouchableOpacity>
            <AdLineMessaging disabled ad={ad} />
            <View style={tw("px-5 py-2 border-b border-grey-slate")}>
              <Text>
                {user?.id === ad.userId ? ad.buyer.username : ad.username}
              </Text>
            </View>
            <FlatList
              ref={flatListRef}
              data={ad.messages}
              contentContainerStyle={tw("px-5 py-2")}
              onContentSizeChange={() =>
                flatListRef.current?.scrollToEnd({ animated: true })
              }
              onLayout={() =>
                flatListRef.current?.scrollToEnd({ animated: true })
              }
              renderItem={({ item: { content, author, created } }) => (
                <View style={tw(author.id === user?.id ? "" : "items-end")}>
                  <View
                    style={tw(
                      "w-5/6 my-2 px-2 py-1 " +
                        (author.id === user?.id
                          ? " bg-grey-slate bg-opacity-20"
                          : " bg-red-main  bg-opacity-10")
                    )}
                  >
                    <Text>{content}</Text>
                    <View style={tw("items-end")}>
                      <Text style={tw("text-xs")}>
                        {format(new Date(created.seconds * 1000), "d/M/yy h:m")}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
              keyExtractor={({ created }) => created.seconds.toString()}
            />
            <TextInput
              multiline
              name="content"
              control={control}
              placeholder="Type here to send a message..."
              right={
                loading ? (
                  <ActivityIndicator
                    color={tailwindConfig.theme.colors["red-main"]}
                  />
                ) : (
                  <TouchableOpacity onPress={onSend}>
                    <Icon
                      size={24}
                      color={tailwindConfig.theme.colors["red-main"]}
                      name="small/32/000000/email-send.png"
                    />
                  </TouchableOpacity>
                )
              }
            />
          </View>
        )}
      </ScreenLoading>
    </KeyboardAvoidingView>
  );
};

export default MessagesScreen;
