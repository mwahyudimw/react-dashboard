import React from "react";
import { CircularProgress } from "@material-ui/core";
import { useRecoilState } from "recoil";
import { ClickStore } from "store/Store";
import { makeStyles } from "@material-ui/styles";
import Backdrop from "@material-ui/core/Backdrop";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import CKEditor from "@ckeditor/ckeditor5-react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(() => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const EditDescription = ({ modalOpen, closeHandle }) => {
  const classes = useStyles();
  const [load, setLoad] = React.useState(false);
  const [id] = useRecoilState(ClickStore);
  const [description, setDescription] = React.useState("");
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    title: "",
    vertical: "top",
    horizontal: "right",
    severity: "",
  });

  const { open, title, severity, vertical, horizontal } = snackbar;

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={6000}
        onClose={() =>
          setSnackbar((prevState) => ({
            ...prevState,
            open: false,
          }))
        }
      >
        <Alert
          onClose={() =>
            setSnackbar((prevState) => ({
              ...prevState,
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
        open={modalOpen}
        onClose={closeHandle}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalOpen}>
          <Card>
            <CardHeader title="Edit your description" subheader="Description" />
            <CardContent>
              <CKEditor
                value={description}
                name="description"
                onChange={(event, editor) => {
                  const data = editor.getData();
                  console.log(data);
                  setDescription(data);
                }}
                editor={ClassicEditor}
              />
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                disabled={load}
                color="primary"
                onClick={() => {
                  setLoad(true);
                  const datas = {
                    description: description,
                    type: "Pengiriman",
                    id: id,
                  };

                  axios({
                    method: "put",
                    url: `${process.env.REACT_APP_API_DASH}/portal-web`,
                    data: datas,
                    headers: {
                      Authorization: localStorage.getItem("token"),
                    },
                  })
                    .then(() => {
                      setLoad(false);
                      setSnackbar((snackbar) => ({
                        ...snackbar,
                        open: true,
                        title: "Success edited your description !",
                        severity: "success",
                      }));
                      window.location.reload();
                    })
                    .catch(() => {
                      setLoad(false);
                      setSnackbar((snackbar) => ({
                        ...snackbar,
                        open: true,
                        title: "Check your connection !",
                        severity: "error",
                      }));
                    });
                }}
              >
                {load ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Edit Description"
                )}
              </Button>
            </CardActions>
          </Card>
        </Fade>
      </Modal>
    </>
  );
};

export default EditDescription;
