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

const ManageGaleri = () => {
  const classes = useStyles();
  return (
    <Card>
      <CardHeader subheader="Manage your Galery" title="Galery" />
      <Divider />
      <form id="myform" encType="multipart/form-data">
        <CardContent>
          <div className={classes.details}>
            <Avatar className={classes.avatar} s />
            <input
              style={{
                position: "absolute",
                marginTop: "40px",
                cursor: "pointer",
              }}
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
          >
            Upload Image
          </Button>
        </CardActions>
      </form>

      <CardContent>
        <TextField
          fullWidth
          label="Title"
          name="title"
          type="text"
          variant="outlined"
        />

        <CKEditor editor={ClassicEditor} />
      </CardContent>
      <Divider />
      <CardActions>
        <Button color="primary" variant="contained">
          Add Galery
        </Button>
      </CardActions>
    </Card>
  );
};

export default ManageGaleri;
