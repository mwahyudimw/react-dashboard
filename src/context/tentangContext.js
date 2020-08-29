import React from "react";
import axios from "axios";

let ContextType;
const { Provider, Consumer } = (ContextType = React.createContext());

class TentangProvider extends React.Component {
  state = {
    tentangkami: [],
    snackbar: {
      loadTentang: true,
      open: false,
      title: "",
      severity: "",
      vertical: "top",
      horizontal: "right",
    },
    values: {
      id: "",
      description: "",
      type: "Tentang-Kami",
    },
    loading: {
      deleted: false,
      post: false,
      put: false,
    },
    disabled: {
      add: false,
      edit: false,
    },
  };

  componentDidMount() {
    this.getTentangKami();
  }

  getTentangKami = async () => {
    const response = await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_DASH}/tentang-kami`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const responseJson = await response;

    if (responseJson.data.portalWebs.length <= 0) {
      this.setState((prevState) => ({
        disabled: {
          ...prevState.disabled,
          add: false,
          edit: true,
        },
        snackbar: {
          ...prevState.snackbar,
          open: true,
          title: "Your tentang-kami empty, please make first description !",
          severity: "info",
          loadTentang: false,
        },
      }));
    } else {
      this.setState((prevState) => ({
        disabled: {
          ...prevState.disabled,
          add: true,
          edit: false,
        },
        tentangkami: responseJson.data.portalWebs,
        snackbar: {
          ...prevState.snackbar,
          open: false,
          loadTentang: false,
        },
        values: {
          ...prevState.values,
          id: responseJson.data.portalWebs[0]._id,
        },
      }));
    }
  };

  handleChange = (event, editor) => {
    const data = editor.getData();
    this.setState((prevState) => ({
      values: {
        ...prevState.values,
        description: data,
      },
    }));
  };

  addTentang = () => {
    const { values } = this.state;

    this.setState((prevState) => ({
      loading: {
        ...prevState.loading,
        post: true,
      },
    }));

    const dataTentang = {
      description: values.description,
      type: values.type,
    };

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_DASH}/portal-web`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      data: dataTentang,
    })
      .then(() => {
        this.setState((prevState) => ({
          disabled: {
            ...prevState.disabled,
            add: true,
            edit: false,
          },
          loading: {
            ...prevState.loading,
            post: true,
          },
          snackbar: {
            ...prevState.snackbar,
            open: true,
            title: "Description has been created !",
            severity: "success",
          },
        }));
      })
      .catch(() => {
        this.setState((prevState) => ({
          disabled: {
            ...prevState.disabled,
            add: true,
            edit: false,
          },
          loading: {
            ...prevState.loading,
            post: false,
          },
          snackbar: {
            ...prevState.snackbar,
            open: true,
            title: "Connection Error !",
            severity: "error",
          },
        }));

        this.getTentangKami();
      });
  };

  editTentang = () => {
    const { values } = this.state;

    this.setState((prevState) => ({
      loading: {
        ...prevState.loading,
        put: true,
      },
    }));

    const dataTentang = {
      id: values.id,
      description: values.description,
      type: values.type,
    };
    axios({
      method: "put",
      url: `${process.env.REACT_APP_API_DASH}/portal-web`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      data: dataTentang,
    })
      .then(() => {
        this.setState((prevState) => ({
          loading: {
            ...prevState.loading,
            put: false,
          },
          disabled: {
            ...prevState.disabled,
            add: false,
            edit: true,
          },

          snackbar: {
            ...prevState.snackbar,
            open: true,
            title: "Description has been edited !",
            severity: "success",
          },
        }));
        this.getTentangKami();
      })
      .catch(() => {
        this.setState((prevState) => ({
          disabled: {
            ...prevState.disabled,
            add: true,
            edit: false,
          },
          loading: {
            ...prevState.loading,
            put: false,
          },
          snackbar: {
            ...prevState.snackbar,
            open: true,
            title: "Connection Error !",
            severity: "error",
          },
        }));

        this.getTentangKami();
      });
  };

  deleteTentang = async (id) => {
    this.setState((prevState) => ({
      loading: {
        ...prevState.loading,
        deleted: true,
      },
    }));
    const response = await axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_DASH}/portal-web/${id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });

    const responseJson = await response;

    if (responseJson) {
      this.setState((prevState) => ({
        loading: {
          ...prevState.loading,
          deleted: true,
        },
        disabled: {
          ...prevState.disabled,
          add: false,
          edit: true,
        },
        snackbar: {
          ...prevState.snackbar,
          open: true,
          title: "Description has been deleted !",
          severity: "success",
        },
      }));
      window.location.reload();
      this.getTentangKami();
    } else {
      this.setState((prevState) => ({
        loading: {
          ...prevState.loading,
          deleted: false,
        },
        disabled: {
          ...prevState.disabled,
          add: true,
          edit: false,
        },
        snackbar: {
          ...prevState.snackbar,
          open: true,
          title: "Check your connection !",
          severity: "error",
        },
      }));
      this.getTentangKami();
    }
  };

  onClose = () => {
    this.setState((prevState) => ({
      snackbar: {
        ...prevState.snackbar,
        open: false,
      },
    }));
  };

  render() {
    const {
      state,
      onClose,
      deleteTentang,
      handleChange,
      addTentang,
      editTentang,
    } = this;
    const { children } = this.props;
    return (
      <Provider
        value={{
          ...state,
          onClose: onClose,
          deleteTentang: deleteTentang,
          addTentang: addTentang,
          handleChange: handleChange,
          editTentang: editTentang,
        }}
      >
        {children}
      </Provider>
    );
  }
}

export { Provider, Consumer, TentangProvider };
