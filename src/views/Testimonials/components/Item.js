import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useRecoilState } from "recoil";
import { TestimonialStore, ClickStore } from "../../../store/Store";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardActions,
  Typography,
  Container,
  IconButton,
  CardContent,
  Button,
  CircularProgress,
  Grid,
} from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import Edit from "./Edit";

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
  const [data, setData] = useRecoilState(TestimonialStore);
  const [click, setClick] = useRecoilState(ClickStore);
  const [load, setLoad] = React.useState(true);
  const [loadDelete, setLoadDelete] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [snackbar, setSnackBar] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "right",
    title: "",
  });

  React.useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios({
          method: "get",
          url: `${process.env.REACT_APP_API_DASH}/testimonials`,
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        const responseJson = await response;
        if (responseJson.data.testimonials.length <= 0) {
          setLoad(false);
          setSnackBar((prevState) => ({
            ...prevState,
            open: true,
            title:
              "Testimonials is empty, please make first testimonials now !",
          }));
        } else {
          setLoad(false);
          setData(responseJson.data.testimonials);
        }
        console.log(responseJson);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, [TestimonialStore]);

  const { vertical, horizontal, open, title } = snackbar;

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
          severity="info"
        >
          {title}
        </Alert>
      </Snackbar>

      <Container>
        <Grid container spacing={3}>
          {load ? (
            <CircularProgress />
          ) : (
            data.map((item) => {
              return (
                <Grid item xs={6} sm={3}>
                  <Card>
                    <CardHeader
                      avatar={
                        <img
                          className={classes.avatar}
                          src={item.thumbnail}
                          alt={item.name}
                        />
                      }
                      action={
                        <IconButton
                          aria-label="edit"
                          onClick={() => {
                            setIsOpen(true);
                            setClick(item._id);
                          }}
                        >
                          <CreateIcon />
                        </IconButton>
                      }
                      title={item.name}
                    />
                    <CardContent>
                      <Typography
                        component="blockquote"
                        variant="body1"
                        dangerouslySetInnerHTML={{ __html: item.quote }}
                      />
                    </CardContent>
                    <CardActions>
                      <Button
                        variant="contained"
                        color="secondary"
                        disabled={loadDelete}
                        onClick={() => {
                          setLoadDelete(true);
                          axios({
                            url: `${process.env.REACT_APP_API_DASH}/testimonials/${item._id}`,
                            method: "delete",
                            headers: {
                              Authorization: localStorage.getItem("token"),
                            },
                          })
                            .then(() => {
                              alert("success delete");
                              setLoadDelete(false);
                              window.location.reload();
                            })
                            .catch(() => {
                              setLoadDelete(false);
                            });
                        }}
                      >
                        Delete
                      </Button>
                      {loadDelete && (
                        <CircularProgress size={20} color="secondary" />
                      )}
                    </CardActions>
                  </Card>
                </Grid>
              );
            })
          )}
        </Grid>
        <Edit openModal={isOpen} handleClose={() => setIsOpen(false)} />
      </Container>
    </div>
  );
};

export default Item;
