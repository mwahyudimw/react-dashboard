import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Button,
} from "@material-ui/core";
import axios from "axios";
import { apiDashManage } from "../../../../api/api";
import Swal from "sweetalert2";

const useStyles = makeStyles((theme) => ({
  root: {},
  details: {
    display: "flex",
  },
  avatar: {
    marginLeft: "auto",
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0,
  },
  progress: {
    marginTop: theme.spacing(2),
  },
  uploadButton: {
    marginRight: theme.spacing(2),
  },
}));

const AccountProfile = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const DataUser = JSON.parse(localStorage.getItem("data"));
  const [picture, setPicture] = useState({
    picture: `http://dashmanage.herokuapp.com/${DataUser.picture}`,
    image: "",
  });
  const [user, setUser] = useState({
    name: "",
    avatar: "",
  });

  useEffect(() => {
    const DataUser = JSON.parse(localStorage.getItem("data"));
    setUser((user) => ({
      ...user,
      username: DataUser.username,
      avatar: `http://dashmanage.herokuapp.com/${DataUser.picture}`,
    }));
  }, []);

  const updateImage = () => {
    setLoading(true);
    console.log(picture.image);
    const formdata = new FormData();
    formdata.append("image", picture.image);

    console.log(formdata);
    axios({
      method: "put",
      url: `${apiDashManage + "update/pict-user"}`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: formdata,
    })
      .then((res) => {
        setLoading(false);
        Swal.fire("Good job!", "Update success", "success");
        localStorage.setItem("data", JSON.stringify(res.data.result));
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

  const onImageChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setPicture((picture) => ({
        ...picture,
        image: file,
        picture: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };
  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <form id="myform" encType="multipart/form-data">
        <CardContent>
          <div className={classes.details}>
            <div>
              <Typography gutterBottom variant="h2">
                {user.username}
              </Typography>
            </div>
            <Avatar className={classes.avatar} src={picture.picture} />
            <input
              style={{
                position: "absolute",
                marginTop: "40px",
                cursor: "pointer",
              }}
              type="file"
              onChange={onImageChange}
              name="image"
            />
          </div>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            onClick={updateImage}
            className={classes.uploadButton}
            color="primary"
            variant="text"
          >
            {loading ? "loading..." : "Upload picture"}
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

AccountProfile.propTypes = {
  className: PropTypes.string,
};

export default AccountProfile;
