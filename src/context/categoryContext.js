import React from "react";

export const CategoryContext = React.createContext();

export const CategoryProvider = (props) => {
  const [categoryContext, setCategoryContext] = React.useState([]);
  return (
    <CategoryContext.Provider value={[categoryContext, setCategoryContext]}>
      {props.children}
    </CategoryContext.Provider>
  );
};
