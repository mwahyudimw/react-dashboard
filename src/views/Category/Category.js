import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import MaterialTable from 'material-table';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  },
  content: {
    marginTop: theme.spacing(0)
  }
}));

export default function Category() {
  const classes = useStyles();
	const [ state, setState ] = React.useState({
		columns: [
			{ title: 'Name', field: 'name' },
			{ title: 'Slug', field: 'slug' },
			{ title: 'ID Product', field: 'productId' },
			
		],
		data: [
			{
				name: 'Daun',
				slug: 'das',
				productId: '1'
			},
			{
				name: 'Pohon',
				slug: 'fas',
				productId: '2'
			},
			{
				name: 'Lontong',
				slug: 'gas',
				productId: '3'
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
					borderRight: '1px solid #fff',
					background: '#358A7C',
					color: '#fff'
				},
				rowStyle: {
					fontFamily: 'Roboto,Helvetica,Arial,sans-serif'
				},
				exportButton: true
			}}
		/>
    </div>
	);
}
