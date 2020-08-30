import { atom } from "recoil";

export const TestimonialStore = atom({
  key: "TestimonialStore",
  default: [],
});

export const ClickStore = atom({
  key: "ClickStore",
  default: "",
});
