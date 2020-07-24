import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { UsersTable } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
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
