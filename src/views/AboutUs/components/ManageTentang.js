import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Button from "@material-ui/core/Button";
import { Consumer } from "context/tentangContext";
import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
}));

const ManageTentang = () => {
  const classes = useStyles();
  return (
    <Consumer>
      {({
        handleChange,
        addTentang,
        disabled,
        loading,
        snackbar,
        onClose,
        editTentang,
      }) => {
        const { vertical, horizontal, open, title, severity } = snackbar;
        const { post, put } = loading;
        const { add, edit } = disabled;
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
              <CardHeader title="About Us" subheader="Manage your about us" />
              <CardContent>
                <CKEditor
                  editor={ClassicEditor}
                  onChange={(event, editor) => handleChange(event, editor)}
                />
              </CardContent>

              <CardActions>
                <div className={classes.wrapper}>
                  <Button
                    color="primary"
                    variant="contained"
                    disabled={add}
                    onClick={addTentang}
                  >
                    {post ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      "Add"
                    )}
                  </Button>
                </div>

                <div className={classes.wrapper}>
                  <Button
                    color="primary"
                    variant="contained"
                    disabled={edit}
                    onClick={editTentang}
                  >
                    {put ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      "Edit"
                    )}
                  </Button>
                </div>
              </CardActions>
            </Card>
          </React.Fragment>
        );
      }}
    </Consumer>
  );
};

export default ManageTentang;
