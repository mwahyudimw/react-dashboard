import React from "react";
import ManageArticle from "./components/ManageArticle";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import CardContent from "@material-ui/core/CardContent";
import Item from "./components/Item";

const Article = () => {
  return (
    <>
      <ManageArticle />
      <Card>
        <CardHeader subheader="Your Article" title="Article" />
        <Divider />
        <CardContent>
          <Item />
        </CardContent>
      </Card>
    </>
  );
};

export default Article;
