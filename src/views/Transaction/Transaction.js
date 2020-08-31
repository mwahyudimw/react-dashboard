import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/styles";
import { ProductContext } from "../../context/productContext";
import MaterialTable from "material-table";
import axios from "axios";
import LoadingOverlay from "react-loading-overlay";
import Swal from "sweetalert2";
import Moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0.5),
  },
  content: {
    marginTop: theme.spacing(0),
  },
}));

export default function Transactions() {
  const classes = useStyles();
  const [productContext, setProductContext] = useContext(ProductContext);
  const [dataTransaction, setDataTransaction] = useState([]);

  const [loading, setLoading] = useState(false);

  var obj = productContext.reduce(function(acc, cur, i) {
    acc[cur._id] = cur.name;
    return acc;
  }, {});
  const [state, setState] = useState({
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
    data: [
      {
        name: "Daun",
      },
      {
        name: "Pohon",
      },
      {
        name: "Lontong",
      },
    ],
  });

  useEffect(() => {
    if (loading === true) {
      getTransaction();
    }
  }, []);

  useEffect(() => {
    getTransaction();
  }, []);

  const getTransaction = () => {
    const abortController = new AbortController();
    const signal = abortController.signal;
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
      signal: signal,
    })
      .then((res) => {
        console.log("respon get category", res.data.transactions);
        setDataTransaction(res.data.transactions);
        setLoading((loading) => ({
          ...loading,
          get: false,
        }));
      })
      .catch((err) => {
        setLoading((loading) => ({
          ...loading,
          get: false,
        }));
        Swal.fire({
          icon: "error",
          title: "Check your connections",
          text: "",
        });
      });

    return function cleanup() {
      abortController.abort();
    };
  };

  const handleRowDelete = (oldData, resolve) => {
    axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_DASH +
        `${"/transactions/" + oldData._id}`}`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        console.log("delete ", res);
        const dataDelete = [...dataTransaction];
        const index = oldData._id;
        dataDelete.splice(index, 1);
        setDataTransaction([...dataDelete]);
        Swal.fire("Delete Success", "", "success");
        resolve();
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
        resolve();
      });
  };

  const handleRowAdd = (newData, resolve) => {
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
        let dataToAdd = [...dataTransaction];
        dataToAdd.push({
          value: newData.value,
          dateTransaction: Moment().format("Do MMMM YYYY"),
          productId: "Refresh untuk update",
          name: newData.name,
          price: "Refresh untuk update",
        });
        setDataTransaction(dataToAdd);
        resolve();
        Swal.fire("Good job!", "added success", "success");
      })
      .catch((err) => {
        resolve();
        Swal.fire({
          icon: "error",
          title: "Check your connections",
          text: "",
        });
      });
  };

  const handleRowUpdate = (newData, oldData, resolve) => {
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
          console.log("update", res.data.transaction);
          const dataUpdate = [...dataTransaction];
          const index = dataTransaction.findIndex(
            (transaction) => transaction._id === oldData._id
          );
          console.log("index", index);
          dataUpdate[index] = newData;
          setDataTransaction(dataUpdate);
          setLoading(true);
          resolve();
          Swal.fire("Update Success", "", "success");
        })
        .catch((err) => {
          resolve();
          Swal.fire({
            icon: "error",
            title: "Check your connections",
            text: "",
          });
        });
    }
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
          title="Transactions"
          columns={state.columns}
          data={dataTransaction.map(({ productId, ...rest }) => {
            return {
              ...rest,
              productId: productId._id,
            };
          })}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve) => {
                handleRowAdd(newData, resolve);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve) => {
                handleRowUpdate(newData, oldData, resolve);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve) => {
                handleRowDelete(oldData, resolve);
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
        />
      </div>
    </LoadingOverlay>
  );
}
