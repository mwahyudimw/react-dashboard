import React from "react";
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
import { Consumer } from "context/articleContext";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CreatableSelect from "react-select/creatable";
import makeAnimated from "react-select/animated";
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

export default function Edit({ openModal, handleClose, editArticle }) {
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
      }) => {
        const { vertical, horizontal, open, title, severity } = snackbar;
        const { picture } = values;
        const { editThumbnail, articleEdit } = loadArticle;
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
                <Card>
                  <CardHeader subheader="Edit your Article" title="Article" />
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
                      onClick={editArticle}
                      disabled={articleEdit}
                    >
                      {articleEdit ? "Loading ..." : "Edit Article"}
                    </Button>
                  </CardActions>
                </Card>
              </Fade>
            </Modal>
          </React.Fragment>
        );
      }}
    </Consumer>
  );
}
