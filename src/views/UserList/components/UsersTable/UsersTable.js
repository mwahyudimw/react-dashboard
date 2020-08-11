import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { apiDashManage } from "../../../../api/api";
import axios from "axios";
import LoadingOverlay from "react-loading-overlay";
import Swal from "sweetalert2";

function UsersTable() {
  const tableRef = React.createRef();
  const [loading, setLoading] = useState(false);
  const [listDataUser, setListDataUser] = useState([]);

  useEffect(() => {
    handleGetDataUser();
  }, []);
  const handleGetDataUser = () => {
    setLoading(true);
    axios({
      method: "get",
      url: `${apiDashManage + "users"}`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        setListDataUser(res.data.user);
        setLoading(false);
        console.log("data baru user", res);
      })
      .catch((err) => {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "check your connection",
          text: "",
        });
      });
  };

  return (
    <LoadingOverlay active={loading} spinner text="loading your data...">
      <MaterialTable
        title="Users List"
        tableRef={tableRef}
        columns={[
          {
            title: "Avatar",
            field: "picture ",
            render: (rowData) => (
              <img
                style={{ height: 36, borderRadius: "50%" }}
                src={`http://dashmanage.herokuapp.com/${rowData.picture}`}
                alt="user"
              />
            ),
          },
          { title: "ID User", field: "_id" },
          { title: "Email", field: "email" },
          { title: "Username", field: "username" },
          // { title: "Last Name", field: "last_name" },
        ]}
        data={listDataUser}
        actions={[
          {
            icon: "refresh",
            tooltip: "Refresh Data",
            isFreeAction: true,
            onClick: () => tableRef.current && tableRef.current.onQueryChange(),
          },
        ]}
        options={{
          headerStyle: {
            fontSize: "15px",
            fontWeight: "bold",
            borderRight: "1px solid #ccc",
          },
          rowStyle: {
            fontFamily: "Roboto,Helvetica,Arial,sans-serif",
          },
        }}
      />
    </LoadingOverlay>
  );
}

export default UsersTable;
