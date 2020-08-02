import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Card, CardContent, Grid, Typography, Avatar } from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import PeopleIcon from "@material-ui/icons/PeopleOutlined";
import axios from "axios";
import { apiDashManage } from "../../../../api/api";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    background: "teal",
  },
  content: {
    alignItems: "center",
    display: "flex",
  },
  title: {
    fontWeight: 700,
    color: "#fff",
  },
  avatar: {
    backgroundColor: "#fff",
    height: 56,
    width: 56,
  },
  icon: {
    height: 32,
    width: 32,
    color: "teal",
  },
  difference: {
    marginTop: theme.spacing(2),
    display: "flex",
    alignItems: "center",
  },
  differenceTextColor: {
    color: "#fff",
  },
  differenceIcon: {
    color: "#fff",
  },
  differenceValue: {
    color: "#fff",
    marginRight: theme.spacing(1),
  },
}));

const TotalUsers = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [jumlahUser, setJumlahUser] = React.useState(0);

  React.useEffect(() => {
    handleGetUser();
  }, []);
  const handleGetUser = () => {
    setLoading(true);
    axios({
      method: "get",
      url: `${apiDashManage + "users"}`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        const dataUser = res.data.user;
        setJumlahUser(dataUser.length);
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
              TOTAL USERS
            </Typography>
            <Typography className={classes.differenceTextColor} variant="h3">
              {loading ? "loading..." : jumlahUser}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <PeopleIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
        <div className={classes.difference}>
          <ArrowUpwardIcon className={classes.differenceIcon} />
          <Typography className={classes.differenceValue} variant="body2">
            16%
          </Typography>
          <Typography className={classes.caption} variant="caption">
            Since last month
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

TotalUsers.propTypes = {
  className: PropTypes.string,
};

export default TotalUsers;
