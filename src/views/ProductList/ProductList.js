import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid} from '@material-ui/core';
import { ProductsToolbar, ProductCard } from './components';
import mockData from './data';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  pagination: {
    marginTop: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
}));

const ProductList = () => {
  const classes = useStyles();

  const [products] = useState(mockData);

  return (
    <div className={classes.root}>
      <div className={classes.content}>
      <Grid
          item
          lg={8}
          md={12}
          xl={12}
          xs={12}
        >
          <ProductCard/>
        </Grid>
      </div>
    </div>
  );
};

export default ProductList;
