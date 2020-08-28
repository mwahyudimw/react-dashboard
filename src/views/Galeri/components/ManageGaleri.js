import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Avatar,
  Button,
  IconButton,
  CardMedia,
  Typography,
  TextField,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { apiDashManage } from "../../../api/api";
import axios from "axios";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Swal from "sweetalert2";
import { ModalDelete } from "../Modal/ModalDelete";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { ModalUpdate } from "../Modal/ModalUpdate";

const useStyles = makeStyles((theme) => ({
  details: {
    display: "flex",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  root: {
    maxWidth: 345,
    marginTop: "30px",
    margin: "10px",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  avatar: {
    marginLeft: "auto",
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0,
  },
  avatar2: {
    height: 50,
    width: 50,
    borderRadius: "50%",
  },

  uploadButton: {
    marginRight: theme.spacing(2),
  },
}));

const ManageGaleri = () => {
  const classes = useStyles();

  const [image, setImage] = useState({
    image1: "",
    image2: "",
  });

  const [images, setimages] = useState([]);

  const [openModal, setOpenModal] = useState({
    delete: false,
    update: false,
  });

  const [loading, setLoading] = useState(false);

  const [_id, setId] = useState("");

  const DataUser = JSON.parse(localStorage.getItem("data"));

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onImageChange = (e) => {
    setImage((image) => ({
      ...image,
      image1: e.target.files[0],
      image2: URL.createObjectURL(e.target.files[0]),
    }));
  };

  const handleGetId = (res) => {
    setId(res._id);
  };

  const handleClickOpenModalDelete = () => {
    setOpenModal((openModal) => ({
      ...openModal,
      delete: !openModal.delete,
    }));
  };

  React.useEffect(() => {
    getGalery();
  }, []);

  const getGalery = () => {
    setLoading(true);
    axios({
      method: "get",
      url: `${apiDashManage + "galery"}`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        setimages(res.data.images);
        setLoading(false);
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

  const handleUpload = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("image", image.image1);
    axios({
      method: "post",
      url: `${apiDashManage + "galery"}`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: formData,
    })
      .then((res) => {
        setLoading(false);
        Swal.fire("Added Success", "", "success");
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

  const handleDelete = () => {
    setLoading(true);
    axios({
      method: "delete",
      url: `${apiDashManage + "galery/" + _id}`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        setLoading(false);
        getGalery();
        Swal.fire("Delete Success", "", "success");
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
    <>
      <Card>
        <CardHeader subheader="Manage your Galery" title="Galery" />
        <Divider />
        <form onSubmit={handleUpload} id="myform" encType="multipart/form-data">
          <CardContent>
            <div className={classes.details}>
              {image.image2 === "" ? (
                <img
                  className={classes.avatar}
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQTzUQcH3J_tnHE9L4ekzLRGv87jwiPkSpUag&usqp=CAU :"
                  style={{
                    width: "150px",
                    height: "100px",
                  }}
                />
              ) : (
                <img
                  className={classes.avatar}
                  src={image.image2}
                  style={{
                    width: "150px",
                    height: "100px",
                  }}
                />
              )}
              <input
                style={{
                  position: "absolute",
                  marginTop: "40px",
                  cursor: "pointer",
                }}
                onChange={onImageChange}
                type="file"
                name="image"
              />
            </div>
          </CardContent>
          <Divider />
          <CardActions>
            <Button
              className={classes.uploadButton}
              color="primary"
              variant="contained"
              onClick={handleUpload}
            >
              Upload Image
            </Button>
          </CardActions>
        </form>
        <Divider />
      </Card>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {images.map((res) => (
          <Card className={classes.root}>
            <CardHeader
              avatar={
                <img
                  className={classes.avatar2}
                  src={`http://dashmanage.herokuapp.com/${DataUser.picture}`}
                />
              }
              action={
                <IconButton onClick={handleClick} aria-label="settings">
                  <MoreVertIcon onClick={() => handleGetId(res)} />
                </IconButton>
              }
              title="Shrimp and Chorizo Paella"
              subheader="September 14, 2016"
            />
            <img
              style={{
                height: "200px",
                width: "350px",
                backgroundSize: "cover",
              }}
              src={`http://dashmanage.herokuapp.com/${res.imageUrl}`}
            />
          </Card>
        ))}
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            onClick={() => [handleClose(), handleClickOpenModalDelete()]}
          >
            Delete
          </MenuItem>
        </Menu>
      </div>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <ModalDelete
        handleClose={handleClickOpenModalDelete}
        close={openModal.delete}
        open={openModal.delete}
        handleDelete={() => [handleDelete(), handleClickOpenModalDelete()]}
      />
    </>
  );
};

export default ManageGaleri;
