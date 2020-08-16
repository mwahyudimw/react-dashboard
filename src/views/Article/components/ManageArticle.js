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
import { Consumer } from "../../../context/articleContext";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CreatableSelect from "react-select/creatable";
import makeAnimated from "react-select/animated";

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

  return (
    <Consumer>
      {({
        snackbar,
        values,
        loadArticle,
        handleEditor,
        onClose,
        handleChange,
        handleTags,
        onImageChange,
        addImage,
        addArticle,
      }) => {
        const { vertical, horizontal, open, title, severity } = snackbar;
        const { picture } = values;
        const { uploadThumbnail, articleAdd } = loadArticle;
        return (
          <React.Fragment>
            <Snackbar
              anchorOrigin={{ vertical, horizontal }}
              open={open}
              autoHideDuration={6000}
              onClose={onClose}
              key={vertical + horizontal}
            >
              <Alert onClose={onClose} severity={severity}>
                {title}
              </Alert>
            </Snackbar>
            <Card>
              <CardHeader subheader="Manage your Article" title="Article" />
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
                  placeholder="Add more tags... [with Enter]"
                />
                <CKEditor
                  editor={ClassicEditor}
                  onChange={(event, editor) => handleEditor(event, editor)}
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
          </React.Fragment>
        );
      }}
    </Consumer>
  );
};

export default ManageArticle;
