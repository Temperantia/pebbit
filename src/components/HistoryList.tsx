import React, { useCallback } from "react";

import ScreenLoading from "./ScreenLoading";
import AdList from "./AdList";
import useAuth from "../hooks/useAuth";
import AdLineHistory from "./AdLineHistory";

const HistoryList = () => {
  const { user } = useAuth();

  const onRenderItem = useCallback(
    ({ item }) => <AdLineHistory ad={item} />,
    [AdLineHistory]
  );

  return (
    <ScreenLoading loading={!user?.history}>
      {user?.history && <AdList ads={user.history} renderItem={onRenderItem} />}
    </ScreenLoading>
  );
};

export default HistoryList;
