import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Card, CardContent, Grid, Typography, Avatar } from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/Notifications";
import CategoryIcon from "@material-ui/icons/Category";
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
    backgroundColor: "teal",
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

const TotalCategory = (props) => {
  const { className, ...rest } = props;
  const [jumlahCategory, setJumlahCategory] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const classes = useStyles();

  React.useEffect(() => {
    handleGetCategory();
  }, []);

  const handleGetCategory = () => {
    setLoading(true);
    axios({
      method: "get",
      url: `${apiDashManage + "category"}`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        const dataCategory = res.data.categories;
        setJumlahCategory(dataCategory.length);
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
              TOTAL CATEGORY
            </Typography>
            <Typography variant="h3">
              {" "}
              {loading ? "loading..." : jumlahCategory}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <CategoryIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
        <div className={classes.difference}>
          <NotificationsIcon className={classes.differenceIcon} />
          <Typography className={classes.caption} variant="caption">
            Since last month
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

TotalCategory.propTypes = {
  className: PropTypes.string,
};

export default TotalCategory;
