import React from 'react';
import MaterialTable from 'material-table';
import { renameProp } from 'recompose';

export default function ProductCard() {
	const [ state, setState ] = React.useState({
		columns: [
			{ title: 'Name Products', field: 'name_product' },
			{ title: 'Category Products', field: 'category_products' },
			{ title: 'Years', field: 'years' },
			{ title: 'Price', field: 'price' },
			{
				title: 'Status',
				field: 'option',
				lookup: { 34: 'Available', 63: 'Not Available' }
			}
		],
		data: [
			{ name_product: 'Mehmet', category_products: 'Baran', years: 1987, price: 'Rp. 75.000', option: 63 },
			{
				name_product: 'Daun',
				category_products: 'Baran',
				years: 2017,
				price: 'Rp. 80.000',
				option: 34
			},
			{ name_product: 'Mehmet', category_products: 'Baran', years: 1987, price: 'Rp. 90.000', option: 63 },
			{
				name_product: 'Daun',
				category_products: 'Baran',
				years: 2017,
				price: 'Rp. 100.000',
				option: 34
			},
			{ name_product: 'Mehmet', category_products: 'Baran', years: 1987, price: 'Rp. 85.000', option: 63 },
			{
				name_product: 'Daun',
				category_products: 'Baran',
				years: 2017,
				price: 'Rp. 95.000',
				option: 34
			}
		]
	});

	return (
		<MaterialTable
			title="Products"
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
	);
}
