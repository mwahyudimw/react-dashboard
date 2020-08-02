import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import moment from "moment";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Button,
  LinearProgress,
} from "@material-ui/core";
import axios from "axios";
import { apiDashManage } from "../../../../api/api";

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
  const DataUser = JSON.parse(localStorage.getItem("data"));
  const [picture, setPicture] = useState(
    `http://dashmanage.herokuapp.com/${DataUser.picture}`
  );
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
  }, [user]);

  const updateImage = () => {
    axios({
      method: "put",
      url: `${apiDashManage + "update/pict-user"}`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: {
        picture: picture,
        id: DataUser._id,
      },
    }).then((res) => {
      console.log("res update image", res);
    });
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setPicture(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };
  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <div className={classes.details}>
          <div>
            <Typography gutterBottom variant="h2">
              {user.username}
            </Typography>
          </div>
          <Avatar className={classes.avatar} src={picture} />
          <input
            style={{ position: "absolute", marginTop: "40px" }}
            type="file"
            onChange={onImageChange}
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
          Upload picture
        </Button>
        <Button variant="text">Remove picture</Button>
      </CardActions>
    </Card>
  );
};

AccountProfile.propTypes = {
  className: PropTypes.string,
};

export default AccountProfile;
