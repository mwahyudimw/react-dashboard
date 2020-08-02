import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Card, CardContent, Grid, Typography, Avatar } from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import axios from "axios";
import { apiDashManage } from "../../../../api/api";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  content: {
    alignItems: "center",
    display: "flex",
  },
  title: {
    fontWeight: 700,
  },
  avatar: {
    backgroundColor: "#0489B1",
    height: 56,
    width: 56,
  },
  icon: {
    height: 32,
    width: 32,
  },
  difference: {
    marginTop: theme.spacing(2),
    display: "flex",
    alignItems: "center",
  },
  differenceIcon: {
    color: theme.palette.success.dark,
  },
  differenceValue: {
    color: theme.palette.success.dark,
    marginRight: theme.spacing(1),
  },
}));

const TotalProduct = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [jumlahProduct, setJumlahProduct] = React.useState(0);

  React.useEffect(() => {
    handleGetProduct();
  }, []);

  const handleGetProduct = () => {
    setLoading(true);
    axios({
      method: "get",
      url: `${apiDashManage + "product"}`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        console.log("product dashboard", res);
        const dataProduct = res.data.products;
        setJumlahProduct(dataProduct.length);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <Grid container justify="space-between">
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              TOTAL PRODUCT
            </Typography>
            <Typography variant="h3">
              {loading ? "loading..." : jumlahProduct}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <ShoppingBasketIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
        <div className={classes.difference}>
          <NotificationsIcon className={classes.differenceIcon} />
          <Typography className={classes.caption} variant="caption">
            The amount of product data
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

TotalProduct.propTypes = {
  className: PropTypes.string,
};

export default TotalProduct;
