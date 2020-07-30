import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/styles";
import MaterialTable from "material-table";
import axios from "axios";
import { apiDashManage } from "../../api/api";
import { CategoryContext } from "../../context/categoryContext";
import Swal from "sweetalert2";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0.5),
  },
  content: {
    marginTop: theme.spacing(0),
  },
}));

export default function Categeory() {
  const classes = useStyles();
  const [categoryContext, setCategoryContext] = useContext(CategoryContext);
  const [nameCategory, setNameCategory] = useState([]);
  const [state, setState] = useState({
    columns: [{ title: "Name", field: "name" }],
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
    handleGetCategory();
  }, []);

  const handleGetCategory = () => {
    axios({
      method: "get",
      url: `${apiDashManage + "category"}`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((res) => {
      // console.log("respon get category", res.data.categories);
      setNameCategory(res.data.categories);
      setCategoryContext(res.data.categories);
    });
  };

  return (
    <div className={classes.root}>
      <MaterialTable
        className={classes.content}
        title="Category"
        columns={state.columns}
        data={nameCategory}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                // data.push(newData);
                axios({
                  method: "post",
                  url: `${apiDashManage + "category"}`,
                  headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                  },
                  data: newData,
                }).then((res) => {
                  Swal.fire("Good job!", "added success", "success");
                  handleGetCategory();
                });
                return { ...prevState, data };
              });
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              resolve();
              if (oldData) {
                setState((prevState) => {
                  const data = [...prevState.data];
                  axios({
                    method: "put",
                    url: `${apiDashManage + "category"}`,
                    headers: {
                      Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                    data: {
                      name: newData.name,
                      id: newData._id,
                    },
                  }).then((res) => {
                    // console.log("edit category", res);
                    handleGetCategory();
                  });
                  return { ...prevState, data };
                });
              }
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                axios({
                  method: "delete",
                  url: `${apiDashManage + `${"category/" + oldData._id}`}`,
                  headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                  },
                }).then((res) => {
                  //   console.log("delete category", res);
                  handleGetCategory();
                });
                return { ...prevState, data };
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
      />
    </div>
  );
}
