import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Avatar,
  Button,
  Snackbar,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useRecoilState } from "recoil";
import { ClickStore } from "../../../store/Store";
import MuiAlert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
  const [snackbar, setSnackBar] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "right",
    title: "",
    severity: "",
  });
  const [click] = useRecoilState(ClickStore);

  const { name, thumbnail, quote, picture } = values;
  const { open, horizontal, title, vertical, severity } = snackbar;

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
    setLoad(true);
    const data = {
      name: name,
      thumbnail: thumbnail,
      quote: quote,
    };

    try {
      const response = await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_DASH}/testimonials`,
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        data: data,
      });

      const responseJson = await response;
      setLoad(false);
      setSnackBar((snackbar) => ({
        ...snackbar,
        open: true,
        title: "Testmonials has been create !",
        severity: "success",
      }));
      console.log(responseJson);
    } catch (err) {
      setLoad(false);
      setSnackBar(() => ({
        ...snackbar,
        open: true,
        title: "Check your connection !",
        severity: "error",
      }));
    }
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={6000}
        onClose={() =>
          setSnackBar((prevState) => ({
            ...prevState,
            open: false,
          }))
        }
      >
        <Alert
          onClose={() =>
            setSnackBar((prevState) => ({
              ...prevState,
              open: false,
            }))
          }
          severity={severity}
        >
          {title}
        </Alert>
      </Snackbar>
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
          <Button
            disabled={load}
            color="primary"
            variant="contained"
            onClick={addTestimonials}
          >
            Add Testimonials
          </Button>
          {load && <CircularProgress size={20} />}
        </CardActions>
      </Card>
    </>
  );
};

export default ManageTestimonial;
