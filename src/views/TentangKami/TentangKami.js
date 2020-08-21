import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import CardContent from "@material-ui/core/CardContent";
import ManageTentang from "./components/ManageTentang";
import ItemTentang from "./components/Item";

const HubungiKami = () => {
  return (
    <>
      <ManageTentang />
      <Card>
        <CardHeader subheader="Tentang Kami" title="Pratinjau" />
        <Divider />
        <CardContent>
          <ItemTentang />
        </CardContent>
      </Card>
    </>
  );
};

export default HubungiKami;
