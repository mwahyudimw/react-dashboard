import React from "react";
import { RecoilRoot } from "recoil";
import { Card, CardHeader, CardContent, Divider } from "@material-ui/core";
import ManagePengiriman from "./components/ManagePengiriman";
import Item from "./components/Item";

const Pengiriman = () => {
  return (
    <RecoilRoot>
      <ManagePengiriman />

      <Card>
        <CardHeader title="Pratinjau" subheader="Delivery" />
        <Divider />
        <CardContent>
          <Item />
        </CardContent>
      </Card>
    </RecoilRoot>
  );
};

export default Pengiriman;
