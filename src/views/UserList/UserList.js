import React from "react";
import { makeStyles } from "@material-ui/styles";

import { UsersTable } from "./components";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  content: {
    marginTop: theme.spacing(0),
  },
}));

const UserList = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <UsersTable />
      </div>
    </div>
  );
};

export default UserList;
