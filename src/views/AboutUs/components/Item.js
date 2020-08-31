import React from "react";
import { Consumer } from "../../../context/tentangContext";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonProgress: {
    position: "relative",
    top: 5,
    marginLeft: 10,
  },
}));

const ItemTentang = () => {
  const classes = useStyles();
  return (
    <Consumer>
      {({ tentangkami, snackbar, onClose, deleteTentang, loading }) => {
        const {
          vertical,
          horizontal,
          open,
          title,
          severity,
          loadTentang,
        } = snackbar;
        const { deleted } = loading;
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
            {loadTentang ? (
              <CircularProgress />
            ) : (
              tentangkami.map((item) => (
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

                  <Typography
                    variant="body1"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                  <Button
                    color="secondary"
                    variant="contained"
                    disabled={deleted}
                    style={{ marginTop: 30 }}
                    onClick={() => deleteTentang(item._id)}
                  >
                    {deleted ? (
                      <CircularProgress size={24} color="secondary" />
                    ) : (
                      "Delete"
                    )}
                  </Button>
                </React.Fragment>
              ))
            )}
          </React.Fragment>
        );
      }}
    </Consumer>
  );
};

export default ItemTentang;
