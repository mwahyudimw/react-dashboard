import React from "react";
import { ArticleProvider } from "../../context/articleContext";
import ManageArticle from "./components/ManageArticle";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import CardContent from "@material-ui/core/CardContent";
import Item from "./components/Item";

const Article = () => {
  return (
    <ArticleProvider>
      <ManageArticle />
      <Card>
        <CardHeader subheader="Preview" title="Article" />
        <Divider />
        <CardContent>
          <Item />
        </CardContent>
      </Card>
    </ArticleProvider>
  );
};

export default Article;
