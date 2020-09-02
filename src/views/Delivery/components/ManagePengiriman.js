import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Avatar,
  Button,
  Snackbar,
  CircularProgress,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/styles";
import { useRecoilState } from "recoil";
import { isDisabled } from "store/Store";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
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

  uploadButton: {
    marginRight: theme.spacing(2),
  },
}));

const ManagePengiriman = () => {
  const classes = useStyles();

  const [data, setData] = useState({
    image: [],
    picture: null,
    description: "",
    type: "Pengiriman",
  });
  const [snackbar, setSnackBar] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "right",
    title: "",
    severity: "",
  });
  const [load, setLoad] = useState(false);
  const [isFalse] = useRecoilState(isDisabled);

  const onImageChange = (e) => {
    let file = e.target.files;

    setData((data) => ({
      ...data,
      image: file,
    }));
  };

  const postPengiriman = () => {
    setLoad(true);
    const formData = new FormData();
    for (let i = 0; i < data.image.length; i++) {
      formData.append("image", data.image[i]);
    }
    formData.append("description", data.description);
    formData.append("type", data.type);
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_DASH + "/portal-web"}`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: formData,
    })
      .then(() => {
        setLoad(false);
        setSnackBar((snackbar) => ({
          ...snackbar,
          open: true,
          title: "Delivery has been added !",
          severity: "success",
        }));
        window.location.reload();
      })
      .catch(() => {
        setLoad(false);
        setSnackBar((snackbar) => ({
          ...snackbar,
          open: true,
          title: "Check your connections !",
          severity: "error",
        }));
      });
  };

  const { open, vertical, horizontal, title, severity } = snackbar;
  const { picture } = data;

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={6000}
        onClose={() =>
          setSnackBar((prevState) => ({
            ...prevState,
            open: false,
          }))
        }
      >
        <Alert
          onClose={() =>
            setSnackBar((prevState) => ({
              ...prevState,
              open: false,
            }))
          }
          severity={severity}
        >
          {title}
        </Alert>
      </Snackbar>
      <Card>
        <CardHeader subheader="Manage your Delivery" title="Delivery" />
        <Divider />
        <form id="myform" encType="multipart/form-data">
          <CardContent>
            <div className={classes.details}>
              <Avatar className={classes.avatar} src={picture} />
              <input
                style={{
                  position: "absolute",
                  marginTop: "40px",
                  cursor: "pointer",
                }}
                type="file"
                multiple
                name="image"
                onChange={onImageChange}
              />
            </div>
          </CardContent>
          <Divider />
        </form>

        <CardContent>
          <CKEditor
            value={data.description}
            name="description"
            onChange={(event, editor) => {
              const datas = editor.getData();
              console.log(data);
              setData((data) => ({
                ...data,
                description: datas,
              }));
            }}
            editor={ClassicEditor}
          />
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            onClick={postPengiriman}
            disabled={isFalse}
            color="primary"
            variant="contained"
          >
            {load ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              " Add to delivery"
            )}
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default ManagePengiriman;
