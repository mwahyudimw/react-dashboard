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
import { Consumer } from "context/hubungiContext";
import { CircularProgress } from "@material-ui/core";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ManageHubungi = () => {
  return (
    <Consumer>
      {({
        handleChange,
        addHubungi,
        disabled,
        loading,
        snackbar,
        onClose,
        editHubungi,
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
              <CardHeader
                title="Contact Us"
                subheader="Manage your contact us"
              />
              <CardContent>
                <CKEditor
                  editor={ClassicEditor}
                  onChange={(event, editor) => handleChange(event, editor)}
                />
              </CardContent>

              <CardActions>
                <Button
                  color="primary"
                  variant="contained"
                  style={{ marginTop: 20, marginLeft: 20 }}
                  disabled={add}
                  onClick={addHubungi}
                >
                  {post ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Add"
                  )}
                </Button>

                <Button
                  color="primary"
                  variant="contained"
                  style={{ marginTop: 20, marginLeft: 20 }}
                  disabled={edit}
                  onClick={editHubungi}
                >
                  {put ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Edit"
                  )}
                </Button>
              </CardActions>
            </Card>
          </React.Fragment>
        );
      }}
    </Consumer>
  );
};

export default ManageHubungi;
