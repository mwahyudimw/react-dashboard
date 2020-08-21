import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import { Consumer } from "../../../context/articleContext";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
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
import CreateIcon from "@material-ui/icons/Create";
import Button from "@material-ui/core/Button";
import moment from "moment";
import Edit from "./Edit";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
  cardLayout: {
    height: "auto",
    [theme.breakpoints.down("sm")]: {
      height: "auto",
      overflow: "hidden",
    },
  },
}));

export default function Item() {
  const classes = useStyles();
  const [isopen, setOpen] = React.useState(false);
  const [id, setId] = React.useState("");
  const data = localStorage.getItem("data");
  const parse = JSON.parse(data);

  const user = {
    name: parse.username,
    avatar: `http://dashmanage.herokuapp.com/${parse.picture}`,
  };

  return (
    <div className={classes.root}>
      <Container>
        <Consumer>
          {({
            article,
            snackbar,
            loading,
            onClose,
            deleteArticle,
            editArticle,
          }) => {
            const {
              vertical,
              horizontal,
              open,
              title,
              severity,
              loadArticle,
            } = snackbar;
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

                <Grid container spacing={3}>
                  {loadArticle
                    ? "loading.."
                    : article.map((tile) => {
                        return (
                          <Grid className={classes.col} item xs={6} sm={3}>
                            <Card key={tile._id} className={classes.cardLayout}>
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
                                    onClick={() => {
                                      setOpen(true);
                                      setId(tile._id);
                                    }}
                                  >
                                    <CreateIcon />
                                  </IconButton>
                                }
                                title={`${tile.title}`}
                                subheader={moment(tile.createdAt).format("LLL")}
                              />
                              <CardMedia
                                className={classes.media}
                                image={`http://dashmanage.herokuapp.com/${tile.thumbnail.imageUrl}`}
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
                                  variant="contained"
                                  color="secondary"
                                  disabled={loading}
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
                <Edit
                  openModal={isopen}
                  editArticle={() => editArticle(id)}
                  handleClose={() => setOpen(false)}
                />
              </React.Fragment>
            );
          }}
        </Consumer>
      </Container>
    </div>
  );
}
