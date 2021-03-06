import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Divider, Drawer } from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import SettingsIcon from "@material-ui/icons/Settings";
import CategoryIcon from "@material-ui/icons/Category";
import ReceiptIcon from "@material-ui/icons/Receipt";
import AssignmentIcon from "@material-ui/icons/Assignment";
import InfoIcon from "@material-ui/icons/Info";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import AirportShuttleIcon from "@material-ui/icons/AirportShuttle";
import ContactPhoneIcon from "@material-ui/icons/ContactPhone";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import { Profile, SidebarNav } from "./components";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up("lg")]: {
      marginTop: 64,
      height: "calc(100% - 64px)",
    },
  },
  root: {
    backgroundColor: theme.palette.white,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    padding: theme.spacing(2),
  },
  divider: {
    margin: theme.spacing(2, 0),
    border: "1px solid gray",
  },
  nav: {
    marginBottom: theme.spacing(2),
  },
}));

const Sidebar = (props) => {
  const { open, variant, onClose, className, ...rest } = props;

  const classes = useStyles();

  const pages = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <DashboardIcon />,
    },
    {
      title: "Users",
      href: "/users",
      icon: <PeopleIcon />,
    },
    {
      title: "Products",
      href: "/products",
      icon: <ShoppingBasketIcon />,
    },
    {
      title: "Transaction",
      href: "/transaction",
      icon: <ReceiptIcon />,
    },

    {
      title: "Category",
      href: "/category",
      icon: <CategoryIcon />,
    },
    {
      title: "Account",
      href: "/account",
      icon: <AccountBoxIcon />,
    },
    {
      title: "Article",
      href: "/article",
      icon: <AssignmentIcon />,
    },
    {
      title: "Galery",
      href: "/galery",
      icon: <PhotoLibraryIcon />,
    },
    {
      title: "Contact Us",
      href: "/contact-us",
      icon: <ContactPhoneIcon />,
    },

    {
      title: "Delivery",
      href: "/delivery",
      icon: <AirportShuttleIcon />,
    },
    {
      title: "About Us",
      href: "/about-us",
      icon: <InfoIcon />,
    },
    {
      title: "Testimonials",
      href: "/testimonials",
      icon: <EmojiPeopleIcon />,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: <SettingsIcon />,
    },
  ];

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div {...rest} className={clsx(classes.root, className)}>
        <Profile />
        <Divider className={classes.divider} />
        <SidebarNav className={classes.nav} pages={pages} />
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired,
};

export default Sidebar;
