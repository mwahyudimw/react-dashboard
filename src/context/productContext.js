import React from "react";

export const ProductContext = React.createContext();

export const ProductProvider = (props) => {
  const [productContext, setProductContext] = React.useState([]);
  return (
    <ProductContext.Provider value={[productContext, setProductContext]}>
      {props.children}
    </ProductContext.Provider>
  );
};
