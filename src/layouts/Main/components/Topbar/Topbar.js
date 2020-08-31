import React, { useState, useEffect, useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { AppBar, Toolbar, Badge, Hidden, IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import TranslateIcon from "@material-ui/icons/Translate";
import InputIcon from "@material-ui/icons/Input";
import { CategoryContext } from "../../../../context/categoryContext";
import { ProductContext } from "../../../../context/productContext";
import axios from "axios";
import { LoadingContext } from "../../../../context/loadingContext";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "none",
    background: "info",
  },
  flexGrow: {
    flexGrow: 1,
  },
  signOutButton: {
    marginLeft: theme.spacing(1),
  },
}));

const Topbar = (props) => {
  const { className, onSidebarOpen, ...rest } = props;
  const [categoryContext, setCategoryContext] = useContext(CategoryContext);
  const [loadingContext, setLoadingContext] = useContext(LoadingContext);
  const [productContext, setProductContext] = useContext(ProductContext);
  const classes = useStyles();

  const [notifications] = useState([]);

  useEffect(() => {
    handleGetCategory();
    handleGetProduct();
  }, []);

  const handleGetCategory = () => {
    setLoadingContext(true);
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_DASH + "/category"}`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        setCategoryContext(res.data.categories);
        setLoadingContext(false);
      })
      .catch((err) => {
        setLoadingContext(false);
      });
  };

  const handleGetProduct = () => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    setLoadingContext(true);
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_DASH + "/product"}`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      signal: signal,
    })
      .then((res) => {
        setProductContext(res.data.products);
        setLoadingContext(false);
      })
      .catch((err) => {
        setLoadingContext(false);
      });
    return function cleanup() {
      abortController.abort();
    };
  };

  const logout = () => {
    localStorage.removeItem("data");
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <AppBar {...rest} className={clsx(classes.root, className)}>
      <Toolbar>
        <RouterLink to="/">
          <img alt="Logo" src="/images/logos/logo--white.svg" />
        </RouterLink>
        <div className={classes.flexGrow} />
        <Hidden mdDown>
          <IconButton color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <TranslateIcon />
            </Badge>
          </IconButton>
          <IconButton
            onClick={logout}
            className={classes.signOutButton}
            color="inherit"
          >
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onSidebarOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func,
};

export default Topbar;
