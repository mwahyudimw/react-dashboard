import React from "react";

export const LoadingContext = React.createContext();

export const LoadingProvider = (props) => {
  const [loadingContext, setLoadingContext] = React.useState(false);
  return (
    <LoadingContext.Provider value={[loadingContext, setLoadingContext]}>
      {props.children}
    </LoadingContext.Provider>
  );
};
