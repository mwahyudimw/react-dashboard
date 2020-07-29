import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import MaterialTable from 'material-table';

const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(2)
	},
	content: {
		marginTop: theme.spacing(0)
	}
}));

export default function Bank() {
	const classes = useStyles();
	const [ state, setState ] = React.useState({
		columns: [
			{ title: 'Name', field: 'name_product' },
			{ title: 'Slug', field: 'slug' },
			{ title: 'Price', field: 'price' },
			{ title: 'Stock', field: 'stock' },
			{ title: 'Description', field: 'description' },
			{ title: 'Status', field: 'status' },
			{ title: 'Image', field: 'imageUrl' },
			{ title: 'ID Category', field: 'categoryId' }
		],
		data: [
			{
				name_product: 'Daun',
				slug: 'Baran',
				price: 'Rp. 80.000',
				stock: 'sss',
				description: 'ddd',
				status: 'sac',
				imageUrl: 'laks',
				categoryId: 'uuuu'
			},
			{
				name_product: 'Daun',
				slug: 'Baran',
				price: 'Rp. 100.000',
				stock: 'sss',
				description: 'ddd',
				status: 'sac',
				imageUrl: 'laks',
				categoryId: 'uuuu'
			},
			{
				name_product: 'Daun',
				slug: 'Baran',
				price: 'Rp. 95.000',
				stock: 'sss',
				description: 'ddd',
				status: 'sac',
				imageUrl: 'laks',
				categoryId: 'uuuu'
			},
			{
				name_product: 'Daun',
				slug: 'Baran',
				price: 'Rp. 100.000',
				stock: 'sss',
				description: 'ddd',
				status: 'sac',
				imageUrl: 'laks',
				categoryId: 'uuuu'
			}
		]
	});

	return (
		
			<div className={classes.root}>
				<MaterialTable
					className={classes.content}
					title="Bank"
					columns={state.columns}
					data={state.data}
					editable={{
						onRowAdd: (newData) =>
							new Promise((resolve) => {
								setTimeout(() => {
									resolve();
									setState((prevState) => {
										const data = [ ...prevState.data ];
										data.push(newData);
										return { ...prevState, data };
									});
								}, 600);
							}),
						onRowUpdate: (newData, oldData) =>
							new Promise((resolve) => {
								setTimeout(() => {
									resolve();
									if (oldData) {
										setState((prevState) => {
											const data = [ ...prevState.data ];
											data[data.indexOf(oldData)] = newData;
											return { ...prevState, data };
										});
									}
								}, 600);
							}),
						onRowDelete: (oldData) =>
							new Promise((resolve) => {
								setTimeout(() => {
									resolve();
									setState((prevState) => {
										const data = [ ...prevState.data ];
										data.splice(data.indexOf(oldData), 1);
										return { ...prevState, data };
									});
								}, 600);
							})
					}}
					options={{
						headerStyle: {
							fontSize: '15px',
							fontWeight: 'bold',
							borderRight: '1px solid #fff',
							background: '#358A7C',
							color: '#fff'
						},
						rowStyle: {
							fontFamily: 'Roboto,Helvetica,Arial,sans-serif'
						},
						exportButton: true
					}}
					detailPanel={(rowData) => {
						return (
							<img
								style={{
									width: '25%',
									height: '250px',
									display: 'block',
									marginLeft: 'auto',
									marginRight: 'auto',
									marginTop: '10px',
									marginBottom: '10px'
								}}
								src="https://images.unsplash.com/photo-1495231916356-a86217efff12?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=676&q=80"
							/>
						);
					}}
					onRowClick={(event, rowData, togglePanel) => togglePanel()}
				/>
			</div>
	);
}
