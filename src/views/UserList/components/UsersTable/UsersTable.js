import React, { useState } from 'react';
import MaterialTable from 'material-table';

function UsersTable() {
  const tableRef = React.createRef();
  
  return (
    <MaterialTable        
      title="Users List"
      tableRef={tableRef}
      columns={[
        {
          title: 'Avatar',
          field: 'avatar',
          render: rowData => (
            <img
              style={{ height: 36, borderRadius: '50%' }}
              src={rowData.avatar}
            />
          ),
        },
        { title: 'ID User', field: 'id' },
        { title: 'Email', field: 'email' },
        { title: 'First Name', field: 'first_name'},
        { title: 'Last Name', field: 'last_name'}
      ]}
      data={query =>
        new Promise((resolve, reject) => {
          let url = 'https://reqres.in/api/users?'
          url += 'per_page=' + query.pageSize
          url += '&page=' + (query.page + 1)
          fetch(url)
            .then(response => response.json())
            .then(result => {
              resolve({
                data: result.data,
                page: result.page - 1,
                totalCount: result.total,
              })
            })
        })
      }
      actions={[
        {
          icon: 'refresh',
          tooltip: 'Refresh Data',
          isFreeAction: true,
          onClick: () => tableRef.current && tableRef.current.onQueryChange(),
        }
      ]}
      options={{
        headerStyle:{
          fontSize:'15px', fontWeight:'bold', borderRight:'1px solid #fff', background: '#35897B', color: '#fff'
        },
        rowStyle: {
          fontFamily:'Roboto,Helvetica,Arial,sans-serif'  
        }
        }}
    />
  )
}

export default UsersTable;
