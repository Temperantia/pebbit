import React, { useCallback } from "react";

import ScreenLoading from "./ScreenLoading";
import AdList from "./AdList";
import useAuth from "../hooks/useAuth";
import AdLineSelling from "./AdLineSelling";

const SellingList = () => {
  const { user } = useAuth();

  const onRenderItem = useCallback(
    ({ item }) => <AdLineSelling ad={item} />,
    [AdLineSelling]
  );

  return (
    <ScreenLoading loading={!user?.sellingList}>
      {user?.sellingList && (
        <AdList ads={user.sellingList} renderItem={onRenderItem} />
      )}
    </ScreenLoading>
  );
};

export default SellingList;
