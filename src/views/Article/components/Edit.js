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
  Avatar,
} from "@material-ui/core";
import { apiDashManage } from "../../../api/api";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CreatableSelect from "react-select/creatable";
import makeAnimated from "react-select/animated";
import axios from "axios";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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

const customStyles = {
  container: () => ({
    marginBottom: "1rem",
    marginTop: "1rem",
  }),
  menu: () => ({
    width: "100%",
  }),
};

const animatedComponents = makeAnimated();

export default function Edit({ open, handleClose }) {
  const classes = useStyles();
  const [loadArticle, setLoadArtile] = useState({
    loadingArticle: false,
    editThumbnail: false,
  });
  const [values, setValues] = useState({
    title: "",
    tags: [],
    description: "",
    image: null,
    imgrequest: null,
    picture: "https://placehold.it/500x600",
    figurethumbnails: "",
  });

  const [state, setState] = React.useState({
    open: false,
    title: "",
    severity: "",
    vertical: "top",
    horizontal: "right",
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleTags = (newValue) => {
    setValues((values) => ({
      ...values,
      tags: newValue,
    }));
  };

  const onImageChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setValues((values) => ({
        ...values,
        image: file,
        picture: reader.result,
        figurethumbnails: file.name,
      }));
    };

    reader.readAsDataURL(file);
  };

  const addImage = () => {
    setLoadArtile((loadingArticle) => ({
      ...loadingArticle,
      editThumbnail: true,
    }));
    const formdata = new FormData();
    formdata.append("image", values.image);

    axios({
      method: "post",
      url: `${apiDashManage}image`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: formdata,
    })
      .then((res) => {
        setLoadArtile((loadingArticle) => ({
          ...loadingArticle,
          editThumbnail: false,
        }));
        setState((state) => ({
          ...state,
          open: true,
          title: "Good job success !",
          severity: "success",
        }));
        setValues((values) => ({
          ...values,
          imgrequest: res.data.thumbnail,
        }));
      })
      .catch((err) => {
        setLoadArtile((loadingArticle) => ({
          ...loadingArticle,
          editThumbnail: false,
        }));
        setState((state) => ({
          ...state,
          open: true,
          title: "Check your connection !",
          severity: "error",
        }));
      });
  };

  const editArticle = (e) => {
    e.preventDefault();
    setLoadArtile((loadArticle) => ({
      ...loadArticle,
      loadingArticle: true,
    }));

    const dataArticle = {
      title: values.title,
      tags: values.tags,
      thumbnail: values.imgrequest,
      description: values.description,
    };

    axios({
      method: "put",
      url: `${apiDashManage}article`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: dataArticle,
    })
      .then((res) => {
        setLoadArtile((loadArticle) => ({
          ...loadArticle,
          loadingArticle: false,
        }));
        setState((state) => ({
          ...state,
          open: true,
          title: "Article has been edited !",
          severity: "success",
        }));
        setValues((values) => ({
          ...values,
          title: "",
          tags: [],
          description: "",
          image: "",
          picture: "",
          imgrequest: null,
          figurethumbnails: "",
        }));
      })
      .catch((err) => {
        setLoadArtile((loadArticle) => ({
          ...loadArticle,
          loadingArticle: false,
        }));
        setState((state) => ({
          ...state,
          open: true,
          title: "Check your connection !",
          severity: "error",
        }));
        setValues((values) => ({
          ...values,
          title: "",
          tags: [],
          description: "",
          image: "",
          picture: "",
          imgrequest: null,
          figurethumbnails: "",
        }));
      });
  };

  const { severity, title, vertical, horizontal } = state;
  const { loadingArticle, editThumbnail } = loadArticle;

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={state.open}
        autoHideDuration={6000}
        onClose={() =>
          setState((state) => ({
            ...state,
            open: false,
          }))
        }
        key={vertical + horizontal}
      >
        <Alert
          onClose={() =>
            setState((state) => ({
              ...state,
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
            <form id="myform" encType="multipart/form-data">
              <CardContent>
                <div className={classes.details}>
                  <Avatar className={classes.avatar} src={values.picture} />
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
                  onClick={addImage}
                  className={classes.uploadButton}
                  disabled={editThumbnail}
                  color="primary"
                  variant="text"
                >
                  {editThumbnail ? "Loading..." : "Edit Thumbnail"}
                </Button>
              </CardActions>
            </form>

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

              <CreatableSelect
                isMulti
                onChange={handleTags}
                components={animatedComponents}
                styles={customStyles}
                placeholder="Add more tags..."
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
            </CardContent>
            <Divider />
            <CardActions style={{ justifyContent: "center" }}>
              <Button
                color="primary"
                variant="outlined"
                onClick={editArticle}
                disabled={loadingArticle}
              >
                {loadingArticle ? "Loading ..." : "Edit Article"}
              </Button>
            </CardActions>
          </Card>
        </Fade>
      </Modal>
    </>
  );
}
