import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/styles";
import MaterialTable from "material-table";
import { CategoryContext } from "../../context/categoryContext";
import { ProductContext } from "../../context/productContext";
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
  const [productContext, setProductContext] = useContext(ProductContext);
  const [dataProduct, setDataProduct] = useState([]);

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
  const [imagesUrl, setImageUrl] = useState("");
  const onImageChange = (e) => {
    setImageUrl(e.target.files[0]);
  };

  const [state, setState] = React.useState({
    columns: [
      { title: "Name", field: "name" },
      { title: "Price", field: "price" },
      { title: "Stock", field: "stock" },
      { title: "Description", field: "description" },
      {
        title: "Image",
        field: "imageUrl",
        editComponent: () => (
          <input type="file" name="imageUrl" onChange={onImageChange} />
        ),
      },
      {
        title: "Category",
        field: "categoryId",
        lookup: obj,
      },
    ],
  });

  useEffect(() => {
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
        console.log("coba", res.data.products);
        setDataProduct(res.data.products);
        setProductContext(res.data.products);
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
                setState((prevState) => {
                  const formData = new FormData();
                  formData.append("image", imagesUrl);
                  formData.append("name", newData.name);
                  formData.append("price", newData.price);
                  formData.append("stock", newData.stock);
                  formData.append("description", newData.description);
                  formData.append("categoryId", newData.categoryId);
                  const data = [...prevState.data];
                  console.log("form adata", formData);
                  axios({
                    method: "post",
                    url: `${process.env.REACT_APP_API_DASH + "/product"}`,
                    headers: {
                      Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                    data: formData,
                  })
                    .then((res) => {
                      console.log("tambah", res);
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
                  return { ...prevState, data };
                });
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve) => {
                setLoading((loading) => ({
                  ...loading,
                  update: true,
                }));
                setTimeout(() => {
                  resolve();
                  if (oldData) {
                    setState((prevState) => {
                      const data = [...prevState.data];
                      axios({
                        method: "put",
                        url: `${process.env.REACT_APP_API_DASH + "/product"}`,
                        headers: {
                          Authorization:
                            "Bearer " + localStorage.getItem("token"),
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
                      return { ...prevState, data };
                    });
                  }
                }, 600);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve) => {
                setLoading((loading) => ({
                  ...loading,
                  delete: true,
                }));
                setTimeout(() => {
                  resolve();
                  setState((prevState) => {
                    const data = [...prevState.data];
                    axios({
                      method: "delete",
                      url: `${process.env.REACT_APP_API_DASH +
                        `${"/product/" + oldData._id}`}`,
                      headers: {
                        Authorization:
                          "Bearer " + localStorage.getItem("token"),
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
                    return { ...prevState, data };
                  });
                }, 600);
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
                src={
                  rowData.imageUrl === "No picture"
                    ? "https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg"
                    : `http://dashmanage.herokuapp.com/${rowData.imageUrl}`
                }
                alt="products"
              />
            );
          }}
          onRowClick={(event, rowData, togglePanel) => togglePanel()}
        />
      </div>
    </LoadingOverlay>
  );
}
