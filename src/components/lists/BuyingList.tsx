import React, { useCallback } from "react";

import ScreenLoading from "../core/ScreenLoading";
import AdList from "./AdList";
import useAuth from "../../hooks/useAuth";
import AdLineBuying from "../lines/AdLineBuying";

const BuyingList = () => {
  const { user } = useAuth();

  const onRenderItem = useCallback(
    ({ item }) => <AdLineBuying ad={item} />,
    [AdLineBuying]
  );

  return (
    <ScreenLoading loading={!user?.buyingList}>
      {user?.buyingList && (
        <AdList ads={user.buyingList} renderItem={onRenderItem} />
      )}
    </ScreenLoading>
  );
};

export default BuyingList;
