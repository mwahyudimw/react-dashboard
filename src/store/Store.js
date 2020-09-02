import { atom } from "recoil";

export const TestimonialStore = atom({
  key: "TestimonialStore",
  default: [],
});

export const ClickStore = atom({
  key: "ClickStore",
  default: "",
});

export const DeliveryStore = atom({
  key: "DeliveryStore",
  default: [],
});

export const isDisabled = atom({
  key: "isDisabled",
  default: false,
});
