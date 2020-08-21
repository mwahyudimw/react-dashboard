import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Button from "@material-ui/core/Button";

const ManageTentang = () => {
  return (
    <Card>
      <CardHeader title="Tentang Kami" subheader="Manage your tentang kami" />
      <CardContent>
        <CKEditor editor={ClassicEditor} />
      </CardContent>

      <CardActions>
        <Button
          color="primary"
          variant="contained"
          style={{ marginTop: 20, marginLeft: 20 }}
        >
          Tambah
        </Button>

        <Button
          color="primary"
          variant="contained"
          style={{ marginTop: 20, marginLeft: 20 }}
        >
          Ubah
        </Button>
      </CardActions>
    </Card>
  );
};

export default ManageTentang;
