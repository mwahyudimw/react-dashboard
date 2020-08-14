import React from "react";

export const ArticleContext = React.createContext();

export const ArticleProvider = (props) => {
  const [article, setArticle] = React.useState([]);
  return (
    <ArticleContext.Provider value={[article, setArticle]}>
      {props.children}
    </ArticleContext.Provider>
  );
};
