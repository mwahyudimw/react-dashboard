import React, { useState, useEffect } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
} from "@material-ui/core";
import axios from "axios";
import { apiDashManage } from "../../../../api/api";

const useStyles = makeStyles(() => ({
  root: {},
}));

const AccountDetails = (props) => {
  const { className, ...rest } = props;
  const classes = useStyles();
  const [dataUser, setDataUser] = useState([]);
  const [values, setValues] = useState({
    username: "",
    email: "",
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    handleGetDataUser();
    const user = JSON.parse(localStorage.getItem("data"));
    setValues((values) => ({
      ...values,
      username: user.username,
      email: user.email,
    }));
    setDataUser(JSON.parse(localStorage.getItem("data")));
  }, []);

  useEffect(() => {
    console.log("dataUsersssssss", dataUser);
  }, [dataUser]);

  const handleGetDataUser = () => {
    axios({
      method: "get",
      url: `${apiDashManage + "users"}`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((res) => {
      console.log("dataUser", res);
    });
  };

  const handleUpdateUser = () => {
    axios({
      method: "put",
      url: `${apiDashManage + "update/user"}`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: values,
    }).then((res) => {
      localStorage.setItem("data", JSON.stringify(res.data.user));
      console.log("update user", res);
    });
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <form autoComplete="off" noValidate>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="username"
                margin="dense"
                name="username"
                onChange={handleChange}
                required
                value={values.username}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                margin="dense"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            onClick={handleUpdateUser}
            color="primary"
            variant="contained"
          >
            Save details
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

AccountDetails.propTypes = {
  className: PropTypes.string,
};

export default AccountDetails;
