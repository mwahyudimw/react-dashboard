import React from "react";
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
      title_edit: "",
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
      url: `${process.env.REACT_APP_API_DASH}/article`,
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

  handleChangeEdit = (e) => {
    e.persist();

    this.setState((prevState) => ({
      values: {
        ...prevState.values,
        title_edit: e.target.value,
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
      url: `${process.env.REACT_APP_API_DASH}/image`,
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

          snackbar: {
            ...prevState.snackbar,
            open: true,
            title: "Good job, upload success !",
            severity: "success",
          },
          values: {
            ...prevState.values,
            imgrequest: res.data.thumbnail,
          },
        }));
      })
      .catch(() => {
        this.setState((prevState) => ({
          loadArticle: {
            ...prevState.loadArticle,
            uploadThumbnail: false,
          },
          snackbar: {
            ...prevState.snackbar,
            open: true,
            title: "Check your connection !",
            severity: "error",
          },
        }));
      });
  };

  editImage = () => {
    this.setState((prevState) => ({
      loadArticle: {
        ...prevState.loadArticle,
        editThumbnail: true,
      },
    }));

    const formdata = new FormData();
    formdata.append("image", this.state.values.image);

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_DASH}/image`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: formdata,
    })
      .then((res) => {
        this.setState((prevState) => ({
          loadArticle: {
            ...prevState.loadArticle,
            editThumbnail: false,
          },

          snackbar: {
            ...prevState.snackbar,
            open: true,
            title: "Good job, upload success !",
            severity: "success",
          },
          values: {
            ...prevState.values,
            imgrequest: res.data.thumbnail,
          },
        }));
      })
      .catch(() => {
        this.setState((prevState) => ({
          loadArticle: {
            ...prevState.loadArticle,
            editThumbnail: false,
          },
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

    const dataArticle = {
      title: this.state.values.title,
      tags: this.state.values.tags,
      thumbnail: this.state.values.imgrequest,
      description: this.state.values.description,
    };

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
      loadArticle: {
        ...prevState.loadArticle,
        articleAdd: true,
      },
    }));

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_DASH}/article`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: dataArticle,
    })
      .then(() => {
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
          loadArticle: {
            ...prevState.loadArticle,
            articleAdd: false,
          },
          snackbar: {
            ...prevState.snackbar,
            open: true,
            title: "Article has been created !",
            severity: "success",
          },
        }));

        this.getArticle();
      })
      .catch((err) => {
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
          loadArticle: {
            ...prevState.loadArticle,
            articleAdd: false,
          },
          snackbar: {
            ...prevState.snackbar,
            open: true,
            title: "Check your connection !",
            severity: "error",
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
        title_edit: "",
        tags: [],
        description: "",
        image: null,
        imgrequest: null,
        picture: "https://placehold.it/500x600",
        figurethumbnails: "",
      },
      loadArticle: {
        ...prevState.loadArticle,
        articleEdit: true,
      },
    }));

    const dataArticle = {
      id: id,
      title: this.state.values.title_edit,
      tags: this.state.values.tags,
      thumbnail: this.state.values.imgrequest,
      description: this.state.values.description,
    };

    axios({
      method: "put",
      url: `${process.env.REACT_APP_API_DASH}/article`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: dataArticle,
    })
      .then(() => {
        this.setState((prevState) => ({
          values: {
            ...prevState.values,
            title_edit: "",
            tags: [],
            description: "",
            image: null,
            imgrequest: null,
            picture: "https://placehold.it/500x600",
            figurethumbnails: "",
          },
          loadArticle: {
            ...prevState.loadArticle,
            articleEdit: false,
            editThumbnail: false,
          },
          snackbar: {
            ...prevState.snackbar,
            open: true,
            title: "Article has been edited !",
            severity: "success",
          },
        }));

        this.getArticle();
      })
      .catch(() => {
        this.setState((prevState) => ({
          values: {
            ...prevState.values,
            title_edit: "",
            tags: [],
            description: "",
            image: "",
            picture: "",
            imgrequest: null,
            figurethumbnails: "",
          },
          loadArticle: {
            ...prevState.loadArticle,
            articleEdit: false,
            editThumbnail: false,
          },
          snackbar: {
            ...prevState.snackbar,
            open: true,
            title: "Check your connection !",
            severity: "error",
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
      .delete(`${process.env.REACT_APP_API_DASH}/article/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        this.setState((prevState) => ({
          loading: false,

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
        this.setState((prevState) => ({
          loading: false,

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
    const {
      state,
      onClose,
      deleteArticle,
      handleChange,
      handleChangeEdit,
      handleTags,
      onImageChange,
      addImage,
      editImage,
      handleEditor,
      addArticle,
      editArticle,
    } = this;
    return (
      <Provider
        value={{
          ...state,
          onClose: onClose,
          deleteArticle: deleteArticle,
          handleChange: handleChange,
          handleChangeEdit: handleChangeEdit,
          handleTags: handleTags,
          onImageChange: onImageChange,
          addImage: addImage,
          editImage: editImage,
          handleEditor: handleEditor,
          addArticle: addArticle,
          editArticle: editArticle,
        }}
      >
        {children}
      </Provider>
    );
  }
}

export { Provider, Consumer, ArticleProvider };
