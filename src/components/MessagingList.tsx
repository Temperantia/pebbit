import React, { useCallback } from "react";

import ScreenLoading from "./ScreenLoading";
import AdList from "./AdList";
import useAuth from "../hooks/useAuth";
import AdLineMessaging from "./AdLineMessaging";

const MessagingList = () => {
  const { user } = useAuth();

  const onRenderItem = useCallback(
    ({ item }) => <AdLineMessaging ad={item} />,
    [AdLineMessaging]
  );

  return (
    <ScreenLoading loading={!user?.messagingList}>
      {user?.messagingList && (
        <AdList ads={user.messagingList} renderItem={onRenderItem} />
      )}
    </ScreenLoading>
  );
};

export default MessagingList;
