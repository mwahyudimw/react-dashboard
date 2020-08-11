import React, { useState } from "react";
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

const ManageArticle = () => {
  const [values, setValues] = useState({
    title: "",
    tags: [],
    description: "",
    image: null,
    figurethumbnails: "",
    base64: "",
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
      method: "post",
      url: `http://dashmanage.herokuapp.com/api/v1/article`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: formData,
    })
      .then(() => {
        setLoadArtile(false);
        Swal.fire("Success !", "Article has been created", "success");
      })
      .catch(() => {
        setLoadArtile(false);
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
        <CardHeader subheader="Manage your Article" title="Article" />
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
            {loadArticle ? "Loading ..." : "Add Article"}
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default ManageArticle;
