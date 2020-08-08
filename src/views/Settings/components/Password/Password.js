import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button,
  TextField,
} from "@material-ui/core";
import axios from "axios";
import { apiDashManage } from "../../../../api/api";
import Swal from "sweetalert2";

const useStyles = makeStyles(() => ({
  root: {},
}));

const Password = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [values, setValues] = useState({
    password: "",
    confirm_password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleConfirmPassword = () => {
    setLoading(true);
    axios({
      method: "put",
      url: `${apiDashManage + "update-password"}`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: values,
    })
      .then((res) => {
        Swal.fire("Update Password Success", "", "success");
        setLoading(false);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Please fill in correctly and check your internet connection",
          text: "",
        });
        setLoading(false);
      });
  };
  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <form onSubmit={handleConfirmPassword}>
        <CardHeader subheader="Update password" title="Password" />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="Old Password"
            name="password"
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="New Password"
            name="confirm_password"
            onChange={handleChange}
            style={{ marginTop: "1rem" }}
            type="password"
            value={values.confirm_password}
            variant="outlined"
          />
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            onClick={handleConfirmPassword}
            color="primary"
            variant="outlined"
          >
            {loading ? "loading..." : "Update Password"}
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

Password.propTypes = {
  className: PropTypes.string,
};

export default Password;
