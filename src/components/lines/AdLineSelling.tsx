import React, { useCallback, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/core";
import { useTranslation } from "react-i18next";

import { Ad } from "../../types";
import tw from "../../tailwind";
import { statusColors } from "../../constants";
import Icon from "../core/Icon";
import TextInput from "../core/TextInput";
import { request } from "../../firebase";
import StatusBanner from "../status/StatusBanner";
import tailwindConfig from "../../../tailwind.config";
import CryptoCurrency from "../core/CryptoCurrency";
import { ellipsis } from "../../utils/string";
import Button from "../core/Button";
import Modal from "../core/Modal";

const AdLineSelling = ({
  ad: { id, title, pictures, prices, status, buyer },
}: {
  ad: Ad;
}) => {
  const { t } = useTranslation(["common", "statuses", "shipping"]);
  const { navigate } = useNavigation();
  const [expanded, setExpanded] = useState(false);
  const [menu, setMenu] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit } = useForm();
  const picture = pictures.find((picture) => !!picture);
  const [currency, price] = Object.entries(prices)[0];
  const statusColor = statusColors[status] ?? "";
  const statusTextTitle = t("statuses:" + status + ".buying.title");
  const statusTextDescription = t("statuses:" + status + ".buying.description");

  const onExpand = useCallback(() => {
    setExpanded(!expanded);
  }, [setExpanded, expanded]);

  const onClick = useCallback(() => {
    navigate("AdScreen", { id });
  }, [navigate, id]);

  const onUpdate = useCallback(
    handleSubmit(async ({ service, number }) => {
      setLoading(true);
      await request(
        "send?ad=" + id + "&service=" + service + "&number=" + number
      );
      setLoading(false);
    }),
    [handleSubmit, request, id, setLoading]
  );

  const onMenu = useCallback(() => {
    setMenu(!menu);
  }, [setMenu, menu]);

  const onShowDelete = useCallback(() => {
    setMenu(false);
    setDeleteModal(!deleteModal);
  }, [setMenu, setDeleteModal, deleteModal]);

  const onValidateDeletion = useCallback(async () => {
    await request(`remove?id=${id}`);
    setDeleteModal(false);
  }, [setDeleteModal, request, id]);

  return (
    <View style={tw("m-2")}>
      <TouchableOpacity
        style={tw("flex-row h-24 w-full border border-grey-slate rounded")}
        onPress={onClick}
      >
        {picture && (
          <StatusBanner
            picture={picture}
            text={statusTextTitle}
            color={statusColor}
          />
        )}

        <View style={tw("p-1 w-3/4")}>
          <View style={tw("flex-row justify-between items-start")}>
            <View style={tw("w-1/2")}>
              <Text style={{ fontFamily: "poppins-medium" }}>
                {ellipsis(title, 30)}
              </Text>
              <Text
                style={tw("text-" + (statusColor ? statusColor : "grey-slate"))}
              >
                {statusTextDescription}
              </Text>
            </View>
            <View style={tw("items-end")}>
              <CryptoCurrency
                currency={currency}
                text={price?.amount?.toString()}
              />
              {status === "new" && (
                <Icon
                  size={24}
                  color={tailwindConfig.theme.colors["red-main"]}
                  name="small/24/000000/menu-2.png"
                  onPress={onMenu}
                />
              )}
              {menu && (
                <View style={tw("bg-white w-20 rounded-md")}>
                  <Text
                    style={[
                      tw("w-full px-3 py-2"),
                      { fontFamily: "poppins-medium" },
                    ]}
                    onPress={onShowDelete}
                  >
                    {t("common:remove")}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <Modal
        text={t("common:removeFromStore")}
        visible={deleteModal}
        onDismiss={onShowDelete}
        onValidate={onValidateDeletion}
      />

      {status === "paid" &&
        (expanded ? (
          <View>
            <Text>{t("shipping:shipTo")}</Text>
            <View style={tw("flex-row")}>
              <Icon
                size={24}
                color={tailwindConfig.theme.colors["red-main"]}
                name="small/24/000000/user.png"
              />
              <Text style={tw("ml-2")}>{buyer.address.name}</Text>
            </View>
            <View style={tw("flex-row")}>
              <Icon
                size={24}
                color={tailwindConfig.theme.colors["red-main"]}
                name="small/24/000000/map.png"
              />
              <Text style={tw("ml-2")}>
                {[
                  buyer.address.street,
                  buyer.address.city,
                  buyer.address.country,
                ].join(" ")}
              </Text>
            </View>
            <TextInput
              label={t("shipping:service")}
              control={control}
              name="service"
            />
            <TextInput
              copy
              label={t("shipping:trackingNumber")}
              control={control}
              name="number"
            />
            <Button
              title={t("shipping:confirm")}
              loading={loading}
              onPress={onUpdate}
            />
            <TouchableOpacity
              style={tw(
                "py-2 flex-row items-center justify-center border rounded border-grey-slate"
              )}
              onPress={onExpand}
            >
              <Icon size={12} name="small/8/000000/collapse-arrow.png" />
              <Text style={[tw("ml-2"), { fontFamily: "poppins-medium" }]}>
                {t("common:accordionCollapse")}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={tw(
              "py-2 flex-row items-center justify-center border rounded border-grey-slate"
            )}
            onPress={onExpand}
          >
            <Icon size={12} name="small/8/000000/expand-arrow.png" />
            <Text style={[tw("ml-2"), { fontFamily: "poppins-medium" }]}>
              {t("common:accordionExpand")}
            </Text>
          </TouchableOpacity>
        ))}
    </View>
  );
};

export default AdLineSelling;
