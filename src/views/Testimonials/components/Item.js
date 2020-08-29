import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useRecoilState } from "recoil";
import { TestimonialStore } from "../../../store/TestimonialsStore";
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
} from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";

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
    maxWidth: 345,
    marginTop: "30px",
    margin: "10px",
  },
}));

const Item = () => {
  const classes = useStyles();
  const [data, setData] = useRecoilState(TestimonialStore);
  const [load, setLoad] = React.useState(true);
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
    <div>
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
        {load
          ? "loading..."
          : data.map((item) => {
              return (
                <Card className={classes.root}>
                  <CardHeader
                    avatar={
                      <img
                        className={classes.avatar}
                        src={`${process.env.REACT_APP_URL_DASH}/${item.thumbnail}`}
                        alt={item.name}
                      />
                    }
                    action={
                      <IconButton aria-label="settings">
                        <CreateIcon />
                      </IconButton>
                    }
                    title={item.name}
                  />
                  <CardActions>
                    <Typography component="blockquote" variant="body1">
                      {item.quote}
                    </Typography>
                  </CardActions>
                </Card>
              );
            })}
      </Container>
    </div>
  );
};

export default Item;
