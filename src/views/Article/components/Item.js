import React from "react";
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
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

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

  React.useEffect(() => {
    const getData = async () => {
      const data = await fetch(
        "https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Fwww.liputan6.com%2Ffeed%2Frss"
      );
      const response = await data.json();
      setArticle(response.items);
    };

    getData();
  });

  return (
    <div className={classes.root}>
      <Container>
        <Grid container spacing={3}>
          {article.map((tile) => {
            const title = tile.title.substr(0, 50);
            const description = tile.description.substr(0, 50);
            return (
              <Grid className={classes.col} item xs={6} sm={3}>
                <Card>
                  <CardHeader
                    avatar={
                      <Avatar
                        aria-label="recipe"
                        src={tile.icon}
                        className={classes.avatar}
                      />
                    }
                    title={`${title}...`}
                    subheader={tile.pubDate}
                  />
                  <CardMedia
                    className={classes.media}
                    image={tile.thumbnail}
                    title={title}
                  />
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      dangerouslySetInnerHTML={{
                        __html: `${description}...`,
                      }}
                    />
                  </CardContent>
                  <CardActions disableSpacing>
                    <Button variant="outlined" color="secondary">
                      DELETE
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
          ;
        </Grid>
      </Container>
    </div>
  );
}
