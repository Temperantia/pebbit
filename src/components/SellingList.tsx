import React, { useCallback } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { adCollection } from "../firebase";
import ScreenLoading from "./ScreenLoading";
import { Ad } from "../types";
import AdList from "./AdList";
import useAuth from "../hooks/useAuth";
import AdLineSelling from "./AdLineSelling";

const SellingList = () => {
  const { user } = useAuth();

  const [ads, loading, error] = useCollectionData<Ad>(
    adCollection.where("userId", "==", user?.id),
    { idField: "id" }
  );

  const onRenderItem = useCallback(
    ({ item }) => <AdLineSelling ad={item}></AdLineSelling>,
    [AdLineSelling]
  );

  return (
    <ScreenLoading loading={loading} error={error}>
      {ads && <AdList ads={ads} renderItem={onRenderItem}></AdList>}
    </ScreenLoading>
  );
};

export default SellingList;
