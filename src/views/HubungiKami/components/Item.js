import React from "react";
import { Consumer } from "../../../context/hubungiContext";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ItemHubungi = () => {
  return (
    <Consumer>
      {({ hubungikami, snackbar, onClose, deleteHubungi, loading }) => {
        const {
          vertical,
          horizontal,
          open,
          title,
          severity,
          loadHubungi,
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
            {loadHubungi
              ? "loading ..."
              : hubungikami.map((item) => (
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
                      onClick={() => deleteHubungi(item._id)}
                    >
                      {deleted ? "Loading..." : "Delete"}
                    </Button>
                  </React.Fragment>
                ))}
          </React.Fragment>
        );
      }}
    </Consumer>
  );
};

export default ItemHubungi;
