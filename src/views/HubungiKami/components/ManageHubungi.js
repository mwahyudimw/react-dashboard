import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Button from "@material-ui/core/Button";

const ManageHubungi = () => {
  return (
    <Card>
      <CardHeader title="Hubungi Kami" subheader="Manage your hubungi kami" />
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

export default ManageHubungi;
