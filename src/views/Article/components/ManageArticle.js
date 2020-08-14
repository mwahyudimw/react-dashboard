import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Avatar,
  Button,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { apiDashManage } from "../../../api/api";
import { ArticleContext } from "../../../context/articleContext";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CreatableSelect from "react-select/creatable";
import makeAnimated from "react-select/animated";
import axios from "axios";

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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ManageArticle = () => {
  const classes = useStyles();

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
    title: "",
    severity: "",
    open: false,
    vertical: "top",
    horizontal: "right",
  });
  const [loadArticle, setLoadArtile] = useState({
    uploadThumbnail: false,
    articleAdd: false,
  });
  const [article, setArticle] = React.useContext(ArticleContext);

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
    setLoadArtile((loadArticle) => ({
      ...loadArticle,
      uploadThumbnail: true,
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
        setLoadArtile((loadArticle) => ({
          ...loadArticle,
          uploadThumbnail: false,
        }));
        setState((state) => ({
          ...state,
          open: true,
          title: "Good job, upload success !",
          severity: "success",
        }));
        setValues((values) => ({
          ...values,
          imgrequest: res.data.thumbnail,
        }));
      })
      .catch((err) => {
        setLoadArtile((loadArticle) => ({
          ...loadArticle,
          uploadThumbnail: false,
        }));
        setState((state) => ({
          ...state,
          open: true,
          title: "Check your connection !",
          severity: "error",
        }));
      });
  };

  const addArticle = (e) => {
    e.preventDefault();

    setLoadArtile((loadArticle) => ({
      ...loadArticle,
      articleAdd: true,
    }));

    const dataArticle = {
      title: values.title,
      tags: values.tags,
      thumbnail: values.imgrequest,
      description: values.description,
    };

    axios({
      method: "post",
      url: `${apiDashManage}article`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: dataArticle,
    })
      .then((res) => {
        setLoadArtile((loadArticle) => ({
          ...loadArticle,
          articleAdd: false,
        }));
        setState((state) => ({
          ...state,
          open: true,
          title: "Article has been created !",
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
          articleAdd: false,
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

  const { title, severity, horizontal, vertical } = state;
  const { uploadThumbnail, articleAdd } = loadArticle;

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
      <Card>
        <CardHeader subheader="Manage your Article" title="Article" />
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
              disabled={uploadThumbnail}
              color="primary"
              variant="text"
            >
              {uploadThumbnail ? "Loading..." : "Upload Thumbnail"}
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
            onClick={addArticle}
            disabled={articleAdd}
          >
            {articleAdd ? "Loading ..." : "Add Article"}
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default ManageArticle;
