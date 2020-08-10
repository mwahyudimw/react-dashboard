import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button,
  TextField,
} from "@material-ui/core";
import Item from "./components/Item";

const useStyles = makeStyles(() => ({
  textArea: {
    width: "100%",
  },
}));

const Article = () => {
  const classes = useStyles();

  const [values, setValues] = useState({
    title: "",
    tags: [],
    description: "",
    thumbnail: null,
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const addArticle = (e) => {
    e.preventDefault();
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  React.useEffect(() => {
    function Console() {
      console.log(values);
    }

    Console();
  });

  return (
    <>
      <Card className={classes.root}>
        <form onSubmit={addArticle}>
          <CardHeader subheader="Manage your Article" title="Article" />
          <Divider />
          <CardContent>
            <TextField
              fullWidth
              label="Title"
              name="title"
              onChange={handleChange}
              type="text"
              value={values.password}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Tags"
              name="tags"
              onChange={handleChange}
              style={{ marginTop: "1rem" }}
              type="text"
              value={values.confirm}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Description"
              name="description"
              onChange={handleChange}
              style={{ marginTop: "1rem" }}
              type="text"
              value={values.confirm}
              variant="outlined"
            />
            <Button
              color="primary"
              variant="outlined"
              component="label"
              style={{ marginTop: "1rem" }}
            >
              Upload Thumbnail
              <input
                type="file"
                name="thumbnail"
                style={{ display: "none" }}
                onChange={handleChange}
              />
            </Button>
          </CardContent>
          <Divider />
          <CardActions style={{ justifyContent: "center" }}>
            <Button color="primary" variant="outlined" onClick={addArticle}>
              Add Article
            </Button>
          </CardActions>
        </form>
      </Card>

      <Card className={classes.root}>
        <CardHeader subheader="Your Article" title="Article" />
        <Divider />
        <CardContent>
          <Item />
        </CardContent>
      </Card>
    </>
  );
};

export default Article;
