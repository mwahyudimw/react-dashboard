import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

const RouteWithLayout = (props) => {
  const { layout: Layout, component: Component, ...rest } = props;

  return (
    <Route
      {...rest}
      render={(matchProps) =>
        localStorage.getItem("token") ? (
          <Layout>
            <Component {...matchProps} />
          </Layout>
        ) : (
          <Layout>
            <Redirect
              to={{
                pathname: "/sign-in",
                state: {
                  from: props.location,
                },
              }}
            />
          </Layout>
        )
      }
    />
  );
};

RouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string,
};

export default RouteWithLayout;
