import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import axios from 'axios';
import { apiDashManage } from '../../../../api/api';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100%'
	},
	content: {
		alignItems: 'center',
		display: 'flex'
	},
	title: {
		fontWeight: 700
	},
	avatar: {
		backgroundColor: 'teal',
		height: 100,
		width: 100
	},
	icon: {
		height: 50,
		width: 50
	},
	difference: {
		marginTop: theme.spacing(2),
		display: 'flex',
		alignItems: 'center'
	},
	differenceIcon: {
		color: theme.palette.success.dark
	},
	differenceValue: {
		color: theme.palette.success.dark,
		marginRight: theme.spacing(1)
	}
}));

const TotalProduct = (props) => {
	const { className, ...rest } = props;

	const classes = useStyles();
	const [ loading, setLoading ] = React.useState(false);
	const [ jumlahProduct, setJumlahProduct ] = React.useState(0);

	React.useEffect(() => {
		handleGetProduct();
	}, []);

	const handleGetProduct = () => {
		setLoading(true);
		axios({
			method: 'get',
			url: `${apiDashManage + 'product'}`,
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem('token')
			}
		})
			.then((res) => {
				const dataProduct = res.data.products;
				setJumlahProduct(dataProduct.length);
				setLoading(false);
			})
			.catch((err) => {
				setLoading(false);
			});
	};

	return (
		<Card {...rest} className={clsx(classes.root, className)}>
			<CardContent>
				<Grid container justify="space-between">
					<Grid item>
						<Typography className={classes.title} color="textSecondary" gutterBottom variant="h5">
							TOTAL PRODUCT
						</Typography>
						<Typography variant="h1" style={{ marginTop: '20px' }}>{loading ? <CircularProgress/> : jumlahProduct}</Typography>
					</Grid>
					<Grid item>
						<Avatar className={classes.avatar}>
							<ShoppingBasketIcon className={classes.icon} />
						</Avatar>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
};

TotalProduct.propTypes = {
	className: PropTypes.string
};

export default TotalProduct;
