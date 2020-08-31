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
import { useRecoilState } from "recoil";
import { ClickStore } from "../../../store/Store";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";

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

const Edit = ({ openModal, handleClose }) => {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    name: "",
    thumbnail: null,
    picture: "https://placehold.it/500x600",
    quote: "",
  });
  const [load, setLoad] = React.useState(false);
  const [click] = useRecoilState(ClickStore);

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

  const editTestimonials = async () => {
    setLoad(true);
    const data = {
      id: click,
      name: name,
      thumbnail: thumbnail,
      quote: quote,
    };

    try {
      const response = await axios({
        method: "put",
        url: `${process.env.REACT_APP_API_DASH}/testimonials`,
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        data: data,
      });

      const responseJson = await response;
      setLoad(false);
      console.log(responseJson);
    } catch (err) {
      setLoad(false);
      console.log(err);
    }
  };
  return (
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
          <CardHeader
            subheader="Manage your Testimonials"
            title="Testimonials"
          />
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
              color="primary"
              variant="contained"
              onClick={editTestimonials}
            >
              {load ? "Loading..." : "Edit Testimonials"}
            </Button>
          </CardActions>
        </Card>
      </Fade>
    </Modal>
  );
};

export default Edit;
