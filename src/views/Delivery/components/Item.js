import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useRecoilState } from "recoil";
import { DeliveryStore, ClickStore } from "../../../store/Store";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardActions,
  Typography,
  Container,
  CardContent,
  Button,
  CircularProgress,
  Grid,
  Menu,
  MenuItem,
  IconButton,
  Avatar,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import EditImage from "./EditImage";
import EditDescription from "./EditDescription";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(() => ({
  avatar: {
    height: 50,
    width: 50,
    borderRadius: "50%",
  },
  root: {
    flexGrow: 1,
  },
}));

const Item = () => {
  const classes = useStyles();
  const [data, setData] = useRecoilState(DeliveryStore);
  const [clickStore, setClickStore] = useRecoilState(ClickStore);
  const [load, setLoad] = React.useState(true);
  const [loadDelete, setLoadDelete] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isOpen, setIsOpen] = React.useState({
    image: false,
    description: false,
  });

  const [snackbar, setSnackBar] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "right",
    title: "",
    severity: "",
  });

  const client = JSON.parse(localStorage.getItem("data"));

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios({
          method: "get",
          url: `${process.env.REACT_APP_API_DASH}/pengiriman`,
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        const responseJson = await response;
        if (responseJson.data.portalWebs.length <= 0) {
          setLoad(false);
          setSnackBar((prevState) => ({
            ...prevState,
            open: true,
            title: "Delivery is empty, please make first delivery now !",
          }));
        } else {
          setLoad(false);
          setData(responseJson.data.portalWebs);
        }
        console.log(responseJson);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, [DeliveryStore]);

  const { vertical, horizontal, open, title, severity } = snackbar;

  return (
    <div className={classes.root}>
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

      <Container>
        <Grid container spacing={2}>
          {load ? (
            <CircularProgress />
          ) : (
            data.map((item) => {
              return (
                <Grid item xs={12}>
                  <Card>
                    <CardHeader
                      avatar={
                        <Avatar
                          aria-label="recipe"
                          src={`${process.env.REACT_APP_URL_DASH}/${client.avatar}`}
                          className={classes.avatar}
                        />
                      }
                      action={
                        <IconButton onClick={handleClick}>
                          <MoreVertIcon />
                        </IconButton>
                      }
                      title={client.username}
                    />
                    <Grid container spacing={3}>
                      {item.imageId.map((el) => (
                        <Grid item xs={6} sm={3}>
                          <img
                            src={`${process.env.REACT_APP_URL_DASH}/${el.imageUrl}`}
                            alt="el"
                            width="200"
                            height="200"
                          />
                        </Grid>
                      ))}
                    </Grid>
                    <CardContent>
                      <Typography
                        component="blockquote"
                        variant="body1"
                        dangerouslySetInnerHTML={{ __html: item.description }}
                      />
                    </CardContent>
                  </Card>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem
                      onClick={() => {
                        setIsOpen((isOpen) => ({
                          ...isOpen,
                          image: true,
                        }));
                        setClickStore(item._id);
                      }}
                    >
                      Edit Image
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setIsOpen((isOpen) => ({
                          ...isOpen,
                          description: true,
                        }));
                        setClickStore(item._id);
                      }}
                    >
                      Edit Description
                    </MenuItem>
                    <MenuItem
                      disabled={loadDelete}
                      onClick={() => {
                        const type = "Pengiriman";
                        setLoadDelete(true);
                        axios({
                          url: `${process.env.REACT_APP_API_DASH}/portal-web/${item._id}`,
                          method: "delete",
                          headers: {
                            Authorization: localStorage.getItem("token"),
                          },
                          data: type,
                        })
                          .then(() => {
                            setSnackBar((snackbar) => ({
                              ...snackbar,
                              open: true,
                              title: "Delivery has been deleted !",
                              severity: "success",
                            }));
                            setLoadDelete(false);
                            window.location.reload();
                          })
                          .catch(() => {
                            setSnackBar((snackbar) => ({
                              ...snackbar,
                              open: true,
                              title: "Connection error !",
                              severity: "error",
                            }));
                            setLoadDelete(false);
                          });
                      }}
                    >
                      {loadDelete ? <CircularProgress size={24} /> : "Delete"}
                    </MenuItem>
                  </Menu>
                </Grid>
              );
            })
          )}
        </Grid>
        <EditImage
          openModal={isOpen.image}
          handleClose={() =>
            setIsOpen((isOpen) => ({
              ...isOpen,
              image: false,
            }))
          }
        />
        <EditDescription
          modalOpen={isOpen.description}
          closeHandle={() => {
            setIsOpen((isOpen) => ({
              ...isOpen,
              description: false,
            }));
          }}
        />
      </Container>
    </div>
  );
};

export default Item;
