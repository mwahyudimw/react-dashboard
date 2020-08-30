import React, { useEffect, useState } from "react";
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
import axios from "axios";

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

const ManagePengiriman = () => {
  const classes = useStyles();

  const [data, setData] = useState({
    image1: "",
    image2: "",
    gambar: "",
    description: "",
  });

  useEffect(() => {
    getPengiriman();
  }, []);

  const onImageChange = (e) => {
    setData((data) => ({
      ...data,
      image1: e.target.files[0],
      image2: URL.createObjectURL(e.target.files[0]),
    }));
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const getPengiriman = () => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_DASH + "/pengiriman"}`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((res) => {
      console.log("get", res);
    });
  };

  const postPengiriman = () => {
    const formData = new FormData();
    formData.append("image", data.image1);
    formData.append("description", data.description);
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_DASH + "/pengiriman"}`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: formData,
    }).then((res) => {
      console.log("post", res);
    });
  };

  return (
    <Card>
      <CardHeader subheader="Manage your Pengiriman" title="Pengiriman" />
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
              onChange={onImageChange}
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
        <CKEditor
          value={data.description}
          name="description"
          onChange={(event, editor) => {
            const datas = editor.getData();
            console.log(data);
            setData((data) => ({
              ...data,
              description: datas,
            }));
          }}
          editor={ClassicEditor}
        />
      </CardContent>
      <Divider />
      <CardActions>
        <Button onClick={postPengiriman} color="primary" variant="contained">
          Tambah ke Pengiriman
        </Button>
      </CardActions>
    </Card>
  );
};

export default ManagePengiriman;
