import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/styles";
import MaterialTable from "material-table";
import axios from "axios";
import { ProductContext } from "../../context/productContext";
import Moment from "moment";
import LoadingOverlay from "react-loading-overlay";
import Swal from "sweetalert2";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  content: {
    marginTop: theme.spacing(0),
  },
}));

export default function Products() {
  const classes = useStyles();
  const [productContext, setProductContext] = useContext(ProductContext);
  const [dataTransaction, setDataTransaction] = useState([]);
  const [loading, setLoading] = useState({
    get: false,
    add: false,
    update: false,
    delete: false,
  });

  var obj = productContext.reduce(function(acc, cur, i) {
    acc[cur._id] = cur.name;
    return acc;
  }, {});

  const [state, setState] = React.useState({
    columns: [
      { title: "Name", field: "name" },
      {
        title: "Date",
        field: "dateTransaction",
        editable: "never",
      },
      { title: "Value", field: "value" },
      { title: "Price", field: "price", editable: "never" },
      { title: "Product", field: "productId", lookup: obj },
    ],
  });

  useEffect(() => {
    getTransaction();
  }, []);

  const getTransaction = async () => {
    setLoading((loading) => ({
      ...loading,
      get: true,
    }));
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_DASH + "/transactions"}`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        setLoading((loading) => ({
          ...loading,
          get: false,
        }));
        console.log("transaction", res.data.transactions);
        setDataTransaction(res.data.transactions);
      })
      .catch((err) => {
        setLoading((loading) => ({
          ...loading,
          get: false,
        }));
      });
  };

  return (
    <LoadingOverlay
      active={
        loading.get || loading.add || loading.update || loading.delete === true
          ? true
          : false
      }
      spinner
      text={
        loading.get
          ? "loading your data..."
          : loading.add
          ? "add data..."
          : loading.update
          ? "update data..."
          : loading.delete
          ? "delete data..."
          : null
      }
    >
      <div className={classes.root}>
        <MaterialTable
          className={classes.content}
          title="Products"
          columns={state.columns}
          data={dataTransaction.map(({ productId, ...rest }) => {
            return {
              ...rest,
              productId: productId,
            };
          })}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve) => {
                setLoading((loading) => ({
                  ...loading,
                  add: true,
                }));
                resolve();

                axios({
                  method: "post",
                  url: `${process.env.REACT_APP_API_DASH + "/transactions"}`,
                  headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                  },
                  data: {
                    value: newData.value,
                    dateTransaction: Moment().format("Do MMMM YYYY"),
                    productId: newData.productId,
                    name: newData.name,
                  },
                })
                  .then((res) => {
                    console.log("res addd", res);
                    setLoading((loading) => ({
                      ...loading,
                      add: false,
                    }));
                  })
                  .catch((err) => {
                    setLoading((loading) => ({
                      ...loading,
                      add: false,
                    }));
                  });
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve) => {
                setLoading((loading) => ({
                  ...loading,
                  update: true,
                }));
                resolve();
                if (oldData) {
                  axios({
                    method: "put",
                    url: `${process.env.REACT_APP_API_DASH + "/transactions"}`,
                    headers: {
                      Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                    data: {
                      name: newData.name,
                      dateTransaction: newData.dateTransaction,
                      value: newData.value,
                      productId: newData.productId,
                      id: newData._id,
                    },
                  })
                    .then((res) => {
                      console.log("put", res);
                      getTransaction();
                      setLoading((loading) => ({
                        ...loading,
                        update: false,
                      }));
                    })
                    .catch((err) => {
                      setLoading((loading) => ({
                        ...loading,
                        update: false,
                      }));
                    });
                }
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve) => {
                setLoading((loading) => ({
                  ...loading,
                  delete: true,
                }));
                setTimeout(() => {
                  resolve();

                  axios({
                    method: "delete",
                    url: `${process.env.REACT_APP_API_DASH +
                      `${"/transactions/" + oldData._id}`}`,
                    headers: {
                      Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                    data: oldData,
                  })
                    .then((res) => {
                      Swal.fire("Delete Success", "", "success");

                      setLoading((loading) => ({
                        ...loading,
                        delete: false,
                      }));
                    })
                    .catch((err) => {
                      setLoading((loading) => ({
                        ...loading,
                        delete: false,
                      }));
                      Swal.fire({
                        icon: "error",
                        title: "Check your connections",
                        text: "",
                      });
                    });
                });
              }),
          }}
          options={{
            headerStyle: {
              fontSize: "15px",
              fontWeight: "bold",
              borderRight: "1px solid #fff",
              background: "#358A7C",
              color: "#fff",
            },
            rowStyle: {
              fontFamily: "Roboto,Helvetica,Arial,sans-serif",
            },
            exportButton: true,
          }}
          detailPanel={(rowData) => {
            return (
              <img
                style={{
                  width: "25%",
                  height: "250px",
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
                src="https://images.unsplash.com/photo-1495231916356-a86217efff12?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=676&q=80"
              />
            );
          }}
          onRowClick={(event, rowData, togglePanel) => togglePanel()}
        />
      </div>
    </LoadingOverlay>
  );
}
