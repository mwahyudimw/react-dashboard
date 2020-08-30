import React from "react";
import { RecoilRoot } from "recoil";
import ManageTestimonial from "./components/ManageTestimonials";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import CardContent from "@material-ui/core/CardContent";
import Item from "./components/Item";

const Testimonials = () => {
  return (
    <RecoilRoot>
      <ManageTestimonial />
      <Card>
        <CardHeader subheader="Testimonials" title="Preview" />
        <Divider />
        <CardContent>
          <Item />
        </CardContent>
      </Card>
    </RecoilRoot>
  );
};

export default Testimonials;
