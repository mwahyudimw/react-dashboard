import React from "react";
import axios from "axios";

let ContextType;
const { Provider, Consumer } = (ContextType = React.createContext());

class HubungiProvider extends React.Component {
  state = {
    hubungikami: [],
    snackbar: {
      loadHubungi: true,
      open: false,
      title: "",
      severity: "",
      vertical: "top",
      horizontal: "right",
    },
    values: {
      id: "",
      description: "",
      type: "Hubungi-Kami",
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
    this.hubungiKami();
  }

  hubungiKami = async () => {
    const response = await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_DASH}/hubungi-kami`,
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
          title: "Your hubungi-kami empty, please make first description !",
          severity: "info",
          loadHubungi: false,
        },
      }));
    } else {
      this.setState((prevState) => ({
        disabled: {
          ...prevState.disabled,
          add: true,
          edit: false,
        },
        hubungikami: responseJson.data.portalWebs,
        snackbar: {
          ...prevState.snackbar,
          open: false,
          loadHubungi: false,
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

  addHubungi = () => {
    const { values } = this.state;

    this.setState((prevState) => ({
      loading: {
        ...prevState.loading,
        post: true,
      },
    }));

    const dataHubungi = {
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
      data: dataHubungi,
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
        this.hubungiKami();
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

        this.hubungiKami();
      });
  };

  editHubungi = () => {
    const { values } = this.state;

    this.setState((prevState) => ({
      loading: {
        ...prevState.loading,
        put: true,
      },
    }));

    const dataHubungi = {
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
      data: dataHubungi,
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
        this.hubungiKami();
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

        this.hubungiKami();
      });
  };

  deleteHubungi = async (id) => {
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
      this.hubungiKami();
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
      this.hubungiKami();
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
      deleteHubungi,
      handleChange,
      addHubungi,
      editHubungi,
    } = this;
    const { children } = this.props;
    return (
      <Provider
        value={{
          ...state,
          onClose: onClose,
          deleteHubungi: deleteHubungi,
          addHubungi: addHubungi,
          handleChange: handleChange,
          editHubungi: editHubungi,
        }}
      >
        {children}
      </Provider>
    );
  }
}

export { Provider, Consumer, HubungiProvider };
