import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Button from "@material-ui/core/Button";
import axios from "axios";
import moment from "moment";
import Edit from "./Edit";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  col: {
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
      flexBasis: "100%",
    },
  },
  imgResponsive: {
    width: 450,
    height: 200,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}));

export default function Item() {
  const classes = useStyles();
  const [article, setArticle] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [timer, setTimer] = React.useState(null);
  const [isMounted, setIsMounted] = React.useState(false);

  const data = localStorage.getItem("data");
  const parse = JSON.parse(data);

  const user = {
    name: parse.username,
    avatar: `http://dashmanage.herokuapp.com/${parse.picture}`,
    bio: parse.role,
  };

  async function getData() {
    try {
      const data = await fetch(
        "http://dashmanage.herokuapp.com/api/v1/article"
      );
      const response = await data.json();
      setArticle(response.articles);
    } catch (err) {
      console.err(err);
    }
    clearTimeout(timer);
    setTimer(setTimeout(getData, 200));
  }

  const deleteArticle = (id) => {
    setLoading(true);
    axios
      .delete(`http://dashmanage.herokuapp.com/api/v1/article/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setLoading(false);
        console.log(res);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    if (!isMounted) {
      getData();
      setIsMounted(true);
    }
  });

  return (
    <div className={classes.root}>
      <Container>
        <Grid container spacing={3}>
          {article.map((tile) => {
            return (
              <Grid className={classes.col} item xs={6} sm={3}>
                <Card key={tile._id}>
                  <CardHeader
                    avatar={
                      <Avatar
                        aria-label="recipe"
                        src={user.avatar}
                        className={classes.avatar}
                      />
                    }
                    action={
                      <IconButton
                        aria-label="settings"
                        onClick={() => setOpen(true)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={`${tile.title}`}
                    subheader={moment(tile.createdAt).format("LLL")}
                  />
                  <CardMedia
                    className={classes.media}
                    image={`http://dashmanage.herokuapp.com/${tile.thumbnail}`}
                    title={tile.title}
                  />
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      dangerouslySetInnerHTML={{
                        __html: `${tile.description}`,
                      }}
                    />
                  </CardContent>
                  <CardActions disableSpacing>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => deleteArticle(tile._id)}
                    >
                      {loading ? "Loading ..." : "DELETE"}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        <Edit open={open} handleClose={() => setOpen(false)} />
      </Container>
    </div>
  );
}
