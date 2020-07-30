import React from "react";

export const CategoryContext = React.createContext();

export const CategoryProvider = (props) => {
  const [categoryContext, setCategoryContext] = React.useState([]);
  console.log("categoryContext", categoryContext);
  return (
    <CategoryContext.Provider value={[categoryContext, setCategoryContext]}>
      {props.children}
    </CategoryContext.Provider>
  );
};
