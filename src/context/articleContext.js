import React from "react";
import { apiDashManage } from "../api/api";
import axios from "axios";

let ContextType;
const { Provider, Consumer } = (ContextType = React.createContext());

class ArticleProvider extends React.Component {
  state = {
    article: [],
    snackbar: {
      loadArticle: true,
      open: false,
      title: "",
      severity: "",
      vertical: "top",
      horizontal: "right",
    },
    loading: false,
    values: {
      title: "",
      tags: [],
      description: "",
      image: null,
      imgrequest: null,
      picture: "https://placehold.it/500x600",
      figurethumbnails: "",
    },
    loadArticle: {
      uploadThumbnail: false,
      editThumbnail: false,
      articleAdd: false,
      articleEdit: false,
    },
  };

  componentDidMount() {
    this.getArticle();
  }

  getArticle = async () => {
    const response = await axios({
      method: "get",
      url: `${apiDashManage}article`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const responseJson = await response;
    console.log(responseJson.data.articles.length);
    if (responseJson.data.articles.length <= 0) {
      this.setState((prevState) => ({
        snackbar: {
          ...prevState.snackbar,
          open: true,
          title: "Your article empty, please make first article !",
          severity: "info",
          loadArticle: false,
        },
      }));
    } else {
      this.setState((prevState) => ({
        article: responseJson.data.articles,
        snackbar: {
          ...prevState.snackbar,
          open: false,
          loadArticle: false,
        },
      }));
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

  /* 
    Add Article
  */

  handleChange = (e) => {
    e.persist();

    this.setState((prevState) => ({
      values: {
        ...prevState.values,
        title: e.target.value,
      },
    }));
  };

  handleTags = (newValue) => {
    this.setState((prevState) => ({
      values: {
        ...prevState.values,
        tags: newValue,
      },
    }));
  };

  handleEditor = (event, editor) => {
    const data = editor.getData();
    this.setState((prevState) => ({
      values: {
        ...prevState.values,
        description: data,
      },
    }));
  };

  onImageChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState((prevState) => ({
        values: {
          ...prevState.values,
          image: file,
          picture: reader.result,
          figurethumbnails: file.name,
        },
      }));
    };

    reader.readAsDataURL(file);
  };

  addImage = () => {
    this.setState((prevState) => ({
      loadArticle: {
        ...prevState.loadArticle,
        uploadThumbnail: true,
      },
    }));

    const formdata = new FormData();
    formdata.append("image", this.state.values.image);

    axios({
      method: "post",
      url: `${apiDashManage}image`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: formdata,
    })
      .then((res) => {
        this.setState((prevState) => ({
          loadArticle: {
            ...prevState.loadArticle,
            uploadThumbnail: false,
          },
        }));
        this.setState((prevState) => ({
          snackbar: {
            ...prevState.snackbar,
            open: true,
            title: "Good job, upload success !",
            severity: "success",
          },
        }));
        this.setState((prevState) => ({
          values: {
            ...prevState.values,
            imgrequest: res.data.thumbnail,
          },
        }));
      })
      .catch((err) => {
        this.setState((prevState) => ({
          loadArticle: {
            ...prevState.loadArticle,
            uploadThumbnail: false,
          },
        }));
        this.setState((prevState) => ({
          snackbar: {
            ...prevState.snackbar,
            open: true,
            title: "Check your connection !",
            severity: "error",
          },
        }));
      });
  };

  addArticle = (e) => {
    e.preventDefault();

    this.setState((prevState) => ({
      values: {
        ...prevState.values,
        title: "",
        tags: [],
        description: "",
        image: null,
        imgrequest: null,
        picture: "https://placehold.it/500x600",
        figurethumbnails: "",
      },
    }));

    this.setState((prevState) => ({
      loadArticle: {
        ...prevState.loadArticle,
        articleAdd: true,
      },
    }));

    const dataArticle = {
      title: this.state.values.title,
      tags: this.state.values.tags,
      thumbnail: this.state.values.imgrequest,
      description: this.state.values.description,
    };

    axios({
      method: "post",
      url: `${apiDashManage}article`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: dataArticle,
    })
      .then((res) => {
        this.setState((prevState) => ({
          loadArticle: {
            ...prevState.loadArticle,
            articleAdd: false,
          },
        }));
        this.setState((prevState) => ({
          snackbar: {
            ...prevState.snackbar,
            open: true,
            title: "Article has been created !",
            severity: "success",
          },
        }));
        this.setState((prevState) => ({
          values: {
            ...prevState.values,
            title: "",
            tags: [],
            description: "",
            image: null,
            imgrequest: null,
            picture: "https://placehold.it/500x600",
            figurethumbnails: "",
          },
        }));
        this.getArticle();
      })
      .catch((err) => {
        this.setState((prevState) => ({
          loadArticle: {
            ...prevState.loadArticle,
            articleAdd: false,
          },
        }));
        this.setState((prevState) => ({
          snackbar: {
            ...prevState.snackbar,
            open: true,
            title: "Check your connection !",
            severity: "error",
          },
        }));
        this.setState((prevState) => ({
          values: {
            ...prevState.values,
            title: "",
            tags: [],
            description: "",
            image: "",
            picture: "",
            imgrequest: null,
            figurethumbnails: "",
          },
        }));
      });
  };

  /* 
    Edit article
  */

  editArticle = (id) => {
    this.setState((prevState) => ({
      values: {
        ...prevState.values,
        title: "",
        tags: [],
        description: "",
        image: null,
        imgrequest: null,
        picture: "https://placehold.it/500x600",
        figurethumbnails: "",
      },
    }));

    this.setState((prevState) => ({
      loadArticle: {
        ...prevState.loadArticle,
        articleEdit: true,
        editThumbnail: true,
      },
    }));

    const dataArticle = {
      id: id,
      title: this.state.values.title,
      tags: this.state.values.tags,
      thumbnail: this.state.values.imgrequest,
      description: this.state.values.description,
    };

    axios({
      method: "put",
      url: `${apiDashManage}article`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: dataArticle,
    })
      .then(() => {
        this.setState((prevState) => ({
          loadArticle: {
            ...prevState.loadArticle,
            articleEdit: false,
            editThumbnail: false,
          },
        }));
        this.setState((prevState) => ({
          snackbar: {
            ...prevState.snackbar,
            open: true,
            title: "Article has been edited !",
            severity: "success",
          },
        }));
        this.setState((prevState) => ({
          values: {
            ...prevState.values,
            title: "",
            tags: [],
            description: "",
            image: null,
            imgrequest: null,
            picture: "https://placehold.it/500x600",
            figurethumbnails: "",
          },
        }));
        this.getArticle();
      })
      .catch(() => {
        this.setState((prevState) => ({
          loadArticle: {
            ...prevState.loadArticle,
            articleEdit: false,
            editThumbnail: false,
          },
        }));
        this.setState((prevState) => ({
          snackbar: {
            ...prevState.snackbar,
            open: true,
            title: "Check your connection !",
            severity: "error",
          },
        }));
        this.setState((prevState) => ({
          values: {
            ...prevState.values,
            title: "",
            tags: [],
            description: "",
            image: "",
            picture: "",
            imgrequest: null,
            figurethumbnails: "",
          },
        }));
      });
  };

  /* 
    Delete article
  */

  deleteArticle = (id) => {
    this.setState({
      loading: true,
    });
    axios
      .delete(`${apiDashManage}article/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        this.setState({
          loading: true,
        });
        this.setState((prevState) => ({
          snackbar: {
            ...prevState.snackbar,
            open: true,
            title: "Article has been deleted !",
            severity: "success",
          },
        }));

        this.getArticle();
      })
      .catch(() => {
        this.setState({
          loading: true,
        });
        this.setState((prevState) => ({
          snackbar: {
            ...prevState.snackbar,
            open: true,
            title: "Check your connection !",
            severity: "error",
          },
        }));
      });
  };

  render() {
    const { children } = this.props;
    const { state } = this;
    return (
      <Provider
        value={{
          ...state,
          onClose: this.onClose,
          deleteArticle: this.deleteArticle,
          handleChange: this.handleChange,
          handleTags: this.handleTags,
          onImageChange: this.onImageChange,
          addImage: this.addImage,
          handleEditor: this.handleEditor,
          addArticle: this.addArticle,
          editArticle: this.editArticle,
        }}
      >
        {children}
      </Provider>
    );
  }
}

export { Provider, Consumer, ContextType, ArticleProvider };
