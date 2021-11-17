import { atom } from "recoil";

export const tokenState = atom({
  key: "tokenState",
  default: null,
});

export const openedFiltersState = atom({
  key: "openedFiltersState",
  default: false,
});
