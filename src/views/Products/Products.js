import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/styles";
import MaterialTable from "material-table";
import { CategoryContext } from "../../context/categoryContext";
import axios from "axios";

import LoadingOverlay from "react-loading-overlay";
import Swal from "sweetalert2";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0.5),
  },
  content: {
    marginTop: theme.spacing(0),
  },
}));

export default function Products() {
  const classes = useStyles();
  const [categoryContext, setCategoryContext] = useContext(CategoryContext);
  const [dataCategory, setDataCategory] = useState([]);
  const [dataProduct, setDataProduct] = useState([]);
  const [id, setId] = useState(null);

  var obj = categoryContext.reduce(function(acc, cur, i) {
    acc[cur._id] = cur.name;
    return acc;
  }, {});

  const [loading, setLoading] = useState({
    get: false,
    add: false,
    update: false,
    delete: false,
  });
  const [state, setState] = React.useState({
    columns: [
      { title: "Name", field: "name" },
      { title: "Price", field: "price" },
      { title: "Stock", field: "stock" },
      { title: "Description", field: "description" },
      { title: "Image", field: "imageUrl" },
      {
        title: "Category",
        field: "categoryId",
        lookup: obj,
      },
    ],
  });

  useEffect(() => {
    // handleGetCategory();
    handleGetProduct();
  }, []);

  const handleGetProduct = () => {
    setLoading((loading) => ({
      ...loading,
      get: true,
    }));
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_DASH + "/product"}`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        setDataProduct(res.data.products);
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
          data={dataProduct.map(({ categoryId, ...rest }) => {
            return {
              ...rest,
              categoryId: categoryId._id,
              categoryName: categoryId.name,
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
                  url: `${process.env.REACT_APP_API_DASH + "/product"}`,
                  headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                  },
                  data: newData,
                })
                  .then((res) => {
                    Swal.fire("Added Success", "", "success");
                    handleGetProduct();
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
                    Swal.fire({
                      icon: "error",
                      title: "Check your connections",
                      text: "",
                    });
                  });
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve) => {
                resolve();
                setLoading((loading) => ({
                  ...loading,
                  update: false,
                }));
                axios({
                  method: "put",
                  url: `${process.env.REACT_APP_API_DASH + "/product"}`,
                  headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                  },
                  data: {
                    name: newData.name,
                    price: newData.price,
                    stock: newData.stock,
                    description: newData.description,
                    imgUrl: newData.imgUrl,
                    categoryId: newData.categoryId,
                    id: newData._id,
                  },
                })
                  .then((res) => {
                    Swal.fire("Update Success", "", "success");
                    handleGetProduct();
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
                    Swal.fire({
                      icon: "error",
                      title: "Check your connections",
                      text: "",
                    });
                  });
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve) => {
                setLoading((loading) => ({
                  ...loading,
                  delete: true,
                }));

                resolve();

                axios({
                  method: "delete",
                  url: `${process.env.REACT_APP_API_DASH +
                    `${"/product/" + oldData._id}`}`,
                  headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                  },
                  data: oldData,
                })
                  .then((res) => {
                    Swal.fire("Delete Success", "", "success");
                    handleGetProduct();
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
