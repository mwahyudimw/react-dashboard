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
import Swal from "sweetalert2";

const useStyles = makeStyles(() => ({
  root: {},
}));

const AccountDetails = (props) => {
  const { className, ...rest } = props;
  const classes = useStyles();
  const [dataUser, setDataUser] = useState([]);
  const [loading, setLoading] = useState(false);
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

  // useEffect(() => {
  //   console.log("dataUsersssssss", dataUser);
  // }, [dataUser]);

  const handleGetDataUser = () => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_DASH + "/users"}`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  };

  const handleUpdateUser = () => {
    setLoading(true);
    axios({
      method: "put",
      url: `${process.env.REACT_APP_API_DASH + "/update/user"}`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: values,
    })
      .then((res) => {
        localStorage.setItem("data", JSON.stringify(res.data.user));
        setLoading(false);
        Swal.fire("Good job!", "Update success", "success");
      })
      .catch((err) => {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Check your connections",
          text: "",
        });
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
            {loading ? "loading..." : "Save details"}
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
