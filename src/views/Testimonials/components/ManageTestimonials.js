import React from "react";
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
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";

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

const ManageTestimonial = () => {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    name: "",
    thumbnail: null,
    picture: "https://placehold.it/500x600",
    quote: "",
  });
  const [load, setLoad] = React.useState(false);

  const { name, thumbnail, quote, picture } = values;

  const onImageChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setValues((prevState) => ({
        ...prevState,
        picture: reader.result,
        thumbnail: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleChange = (e) => {
    e.persist();
    setValues((prevState) => ({
      ...prevState,
      name: e.target.value,
    }));
  };

  const addTestimonials = async () => {
    const data = {
      name: name,
      thumbnail: thumbnail,
      quote: quote,
    };

    try {
      const response = await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_DASH}/testimonials`,
        body: data,
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      const responseJson = await response;
      console.log(responseJson);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card>
      <CardHeader subheader="Manage your Testimonials" title="Testimonials" />
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
              onChange={onImageChange}
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
          >
            Upload Thumbnail
          </Button>
        </CardActions>
      </form>

      <CardContent>
        <TextField
          fullWidth
          label="Name"
          name="name"
          type="text"
          variant="outlined"
          style={{ marginBottom: 25 }}
          onChange={handleChange}
        />

        <CKEditor
          editor={ClassicEditor}
          onChange={(event, editor) => {
            const quotes = editor.getData();
            setValues((prevState) => ({
              ...prevState,
              quote: quotes,
            }));
          }}
        />
      </CardContent>
      <Divider />
      <CardActions>
        <Button color="primary" variant="contained" onClick={addTestimonials}>
          {load ? "Loading..." : "Add Testimonials"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default ManageTestimonial;
