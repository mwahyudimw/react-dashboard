import React, { useState, useEffect, useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { AppBar, Toolbar, Badge, Hidden, IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import TranslateIcon from "@material-ui/icons/Translate";
import InputIcon from "@material-ui/icons/Input";
import { apiDashManage } from "../../../../api/api";
import { CategoryContext } from "../../../../context/categoryContext";
import axios from "axios";

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
  const classes = useStyles();

  const [notifications] = useState([]);

  useEffect(() => {
    handleGetCategory();
  }, []);

  const handleGetCategory = () => {
    axios({
      method: "get",
      url: `${apiDashManage + "category"}`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((res) => {
      console.log("respon get CATEGORY", res.data.categories);
      setCategoryContext(res.data.categories);
    });
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
          <IconButton className={classes.signOutButton} color="inherit">
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
