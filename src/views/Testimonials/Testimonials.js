import React from "react";
import { RecoilRoot } from "recoil";
import ManageTestimonial from "./components/ManageTestimonials";
import Item from "./components/Item";

const Testimonials = () => {
  return (
    <RecoilRoot>
      <ManageTestimonial />
      <Item />
    </RecoilRoot>
  );
};

export default Testimonials;
