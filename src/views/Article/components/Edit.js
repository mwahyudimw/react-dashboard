import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button,
  TextField,
  Typography,
} from "@material-ui/core";
import Swal from "sweetalert2";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function Edit({ open, handleClose }) {
  const classes = useStyles();
  const [values, setValues] = useState({
    title: "",
    tags: [],
    description: "",
    image: "",
    figurethumbnails: "",
  });
  const [loading, setLoading] = useState(true);
  const [loadArticle, setLoadArtile] = useState(false);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const onImageChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setLoading(false);
      setValues((values) => ({
        ...values,
        image: file,
        figurethumbnails: file.name,
        base64: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  const addArticle = (e) => {
    e.preventDefault();
    setLoadArtile(true);

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("tags", values.tags);
    formData.append("description", values.description);
    formData.append("image", values.image);

    axios({
      method: "put",
      url: `http://dashmanage.herokuapp.com/api/v1/article`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: formData,
    })
      .then((res) => {
        setLoadArtile(false);
        Swal.fire("Success !", "Article has been edited", "success");
        console.log(res);
      })
      .catch((err) => {
        setLoadArtile(false);
        Swal.fire({
          icon: "error",
          title: "Check your connections",
          text: "",
        });
        console.log(err);
      });
  };
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Card>
          <CardHeader subheader="Edit your Article" title="Article" />
          <Divider />
          <CardContent>
            <TextField
              fullWidth
              label="Title"
              name="title"
              onChange={handleChange}
              type="text"
              value={values.title}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Tags"
              name="tags"
              onChange={handleChange}
              style={{ marginTop: "1rem", marginBottom: "1rem" }}
              type="text"
              value={values.tags}
              variant="outlined"
            />
            <CKEditor
              editor={ClassicEditor}
              onChange={(event, editor) => {
                const data = editor.getData();
                setValues((values) => ({
                  ...values,
                  description: data,
                }));
              }}
            />
            <form encType="multipart/form-data">
              <Button
                color="primary"
                variant="outlined"
                component="label"
                style={{ marginTop: "1rem" }}
              >
                Upload Thumbnail
                <input
                  type="file"
                  name="image"
                  style={{ display: "none" }}
                  onChange={onImageChange}
                />
              </Button>
              <Typography variant="body1" style={{ marginTop: 25 }}>
                {loading ? "No file choosen" : values.figurethumbnails}
              </Typography>
            </form>
          </CardContent>
          <Divider />
          <CardActions style={{ justifyContent: "center" }}>
            <Button color="primary" variant="outlined" onClick={addArticle}>
              {loadArticle ? "Loading ..." : "Edit Article"}
            </Button>
          </CardActions>
        </Card>
      </Fade>
    </Modal>
  );
}
