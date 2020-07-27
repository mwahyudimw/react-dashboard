import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import MaterialTable from 'material-table';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(0.5)
  },
  content: {
    marginTop: theme.spacing(0)
  }
}));

export default function Categeory() {
  const classes = useStyles();
	const [ state, setState ] = React.useState({
		columns: [
			{ title: 'Name Products', field: 'name_product' },
			{ title: 'Slug', field: 'slug' },
			{ title: 'Years', field: 'years' },
			{ title: 'Price', field: 'price' },
			{
				title: 'Status',
				field: 'option',
				lookup: { 34: 'Available', 63: 'Not Available' }
			}
		],
		data: [
			{ name_product: 'Mehmet', slug: 'Baran', years: 1987, price: 'Rp. 75.000', option: 63 },
			{
				name_product: 'Daun',
				slug: 'Baran',
				years: 2017,
				price: 'Rp. 80.000',
				option: 34
			},
			{ name_product: 'Mehmet', slug: 'Baran', years: 1987, price: 'Rp. 90.000', option: 63 },
			{
				name_product: 'Daun',
				slug: 'Baran',
				years: 2017,
				price: 'Rp. 100.000',
				option: 34
			},
			{ name_product: 'Mehmet', slug: 'Baran', years: 1987, price: 'Rp. 85.000', option: 63 },
			{
				name_product: 'Daun',
				slug: 'Baran',
				years: 2017,
				price: 'Rp. 95.000',
				option: 34
			}
		]
	});

	return (
    <div className={classes.root}>
		<MaterialTable
      className={classes.content}
			title="Category"
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
					borderRight: '1px solid #ccc'
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
							width: '50%',
							height: '400px',
							display: 'block',
							marginLeft: 'auto',
							marginRight: 'auto'
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
