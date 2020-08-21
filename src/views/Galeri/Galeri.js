import React from "react";
import ManageGaleri from "./components/ManageGaleri";
import { Card, CardHeader, Container } from "@material-ui/core";

const Galeri = () => {
  return (
    <>
      <ManageGaleri />

      <Card>
        <CardHeader title="Galery" subheader="Manage your galery" />
        <Container></Container>
      </Card>
    </>
  );
};

export default Galeri;
