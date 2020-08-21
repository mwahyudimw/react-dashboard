import React from "react";
import ManagePengiriman from "./components/ManagePengiriman";
import { Card, CardHeader, Container } from "@material-ui/core";

const Pengiriman = () => {
  return (
    <>
      <ManagePengiriman />

      <Card>
        <CardHeader title="Pratinjau" subheader="Pengiriman" />
        <Container></Container>
      </Card>
    </>
  );
};

export default Pengiriman;
