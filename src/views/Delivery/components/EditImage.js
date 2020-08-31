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
  Modal,
  Fade,
  Backdrop,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useRecoilState } from "recoil";
import { ClickStore } from "store/Store";
import MuiAlert from "@material-ui/lab/Alert";
import axios from "axios";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  details: {
    display: "flex",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
  card: {
    width: "70%",
  },
}));

const EditImage = ({ openModal, handleClose }) => {
  const classes = useStyles();

  const [data, setData] = useState({
    image: [],
    picture: null,
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
  const [id] = useRecoilState(ClickStore);

  const onImageChange = (e) => {
    let file = e.target.files;

    setData((data) => ({
      ...data,
      image: file,
    }));
  };

  const editDelivery = () => {
    setLoad(true);
    const formData = new FormData();
    formData.append("id", id);
    for (let i = 0; i < data.image.length; i++) {
      formData.append("image", data.image[i]);
    }
    axios({
      method: "put",
      url: `${process.env.REACT_APP_API_DASH + "/pengiriman"}`,
      headers: {
        Authorization: "Bearer" + localStorage.getItem("token"),
      },
      data: formData,
    })
      .then((res) => {
        setLoad(false);
        setSnackBar((snackbar) => ({
          ...snackbar,
          open: true,
          title: "Delivery has been edited !",
          severity: "success",
        }));
        console.log("post", res);
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
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openModal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <Card className={classes.card}>
            <CardHeader subheader="Edit your Delivery" title="Delivery" />
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

            <Divider />
            <CardActions>
              <Button
                onClick={editDelivery}
                color="primary"
                variant="contained"
              >
                {load ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  " Edit your image"
                )}
              </Button>
            </CardActions>
          </Card>
        </Fade>
      </Modal>
    </>
  );
};

export default EditImage;
