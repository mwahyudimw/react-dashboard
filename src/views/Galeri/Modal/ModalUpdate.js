import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import { apiDashManage } from "../../../api/api";

export const ModalUpdate = ({ open, handleClose, close, id }) => {
  const [image, setImage] = useState({
    image1: "",
    image2: "",
  });

  const onImageChange = (e) => {
    setImage((image) => ({
      ...image,
      image1: e.target.files[0],
      image2: URL.createObjectURL(e.target.files[0]),
    }));
  };

  const updateImage = () => {
    const formData = new FormData();
    formData.append("image", image.image1);
    axios({
      method: "put",
      url: `${apiDashManage + "galery/" + id}`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: formData,
    }).then((res) => {
      console.log(res, "update");
    });
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to Update this image?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Select image
          </DialogContentText>
          <input onChange={onImageChange} type="file" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button
            onClick={() => [handleClose, updateImage()]}
            color="primary"
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
