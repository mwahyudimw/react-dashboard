import React from "react";
import { HubungiProvider } from "context/hubungiContext";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import CardContent from "@material-ui/core/CardContent";
import ManageHubungi from "./components/ManageHubungi";
import ItemHubungi from "./components/Item";

const HubungiKami = () => {
  return (
    <HubungiProvider>
      <ManageHubungi />
      <Card>
        <CardHeader subheader="Hubungi Kami" title="Pratinjau" />
        <Divider />
        <CardContent>
          <ItemHubungi />
        </CardContent>
      </Card>
    </HubungiProvider>
  );
};

export default HubungiKami;
