import React from "react";
import { Card, Container, Button, Link } from "@material-ui/core";
import styles from "../IncognitoPages/style/styleRegister";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { authenticationService } from "../../_services/authentication.service";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import TagFacesIcon from "@material-ui/icons/TagFaces";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles2 = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));
function InputCustoms({ errors, touched, name, keyObj, type = "text" }) {
  return (
    <div className="form-group">
      <Field
        name={keyObj}
        type={type}
        render={({ field, form: { isSubmitting } }) => (
          <input
            className={
              "form-control" +
              (errors[keyObj] && touched[keyObj] ? " is-invalid" : "")
            }
            {...field}
            disabled={isSubmitting}
            type={type}
            placeholder={name}
          />
        )}
      />
      <ErrorMessage
        name={keyObj}
        component="div"
        className="invalid-feedback "
        style={{ display: "none" }}
      />
    </div>
  );
}

export default function RegisterTeacher(props) {
  const classes = styles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const classes2 = useStyles2();
  const [chipData, setChipData] = React.useState([
    { key: 0, label: "Angular" },
    { key: 1, label: "jQuery" },
    { key: 2, label: "Polymer" },
  ]);

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };

  return (
    <Container className={classes.container}>
      <Card variant="outlined" style={{ padding: 30 }}>
        <div>
          <Typography
            style={{
              textAlign: "center",
              fontSize: "40px",
              marginTop: "20px",
              marginBottom: "10px",
            }}
          >
            Registrarse
          </Typography>
          <Formik
            initialValues={{
              Enrollment: "",
              Mail: "",
              Career: "",
              MatterCode: "",
              MailITSCTeacher: "",
              name: "",
              password: "",
            }}
            validationSchema={Yup.object().shape({
              Enrollment: Yup.string().required("o"),
              Mail: Yup.string().required("o"),
              Career: Yup.string().required("o"),
              MatterCode: Yup.string().required("o"),
              MailITSCTeacher: Yup.string().required("o"),
              name: Yup.string().required("o"),
              password: Yup.string().required("o"),
            })}
            onSubmit={(initialValues, { setStatus, setSubmitting }) => {
              setStatus();
              authenticationService.register(initialValues).then(
                (response) => {
                  const { from } = props.location.state || {
                    from: { pathname: "/registerSuccess" },
                  };
                  props.history.push(from);
                  console.log(response);
                },
                (error) => {
                  setSubmitting(false);
                  setStatus(error);
                  handleClick();
                }
              );
            }}
            render={({ errors, status, touched, isSubmitting }) => (
              <Form>
                <InputCustoms
                  errors={errors}
                  touched={touched}
                  keyObj="Enrollment"
                  name="Codigo"
                />

                <InputCustoms
                  errors={errors}
                  touched={touched}
                  keyObj="Career"
                  name="Nombre y Apellido"
                />

                <InputCustoms
                  errors={errors}
                  touched={touched}
                  keyObj="Mail"
                  name="Correo ITSC"
                />

                <Paper component="ul" className={classes.root}>
                  {chipData.map((data) => {
                    let icon;

                    if (data.label === "React") {
                      icon = <TagFacesIcon />;
                    }

                    return (
                      <li key={data.key}>
                        <Chip
                          icon={icon}
                          label={data.label}
                          onDelete={
                            data.label === "React"
                              ? undefined
                              : handleDelete(data)
                          }
                          className={classes.chip}
                        />
                      </li>
                    );
                  })}
                </Paper>

                <InputCustoms
                  errors={errors}
                  touched={touched}
                  keyObj="password"
                  name="Anadir secciones"
                />

                <InputCustoms
                  errors={errors}
                  touched={touched}
                  keyObj="password"
                  name="Contraseña"
                />

                <InputCustoms
                  errors={errors}
                  touched={touched}
                  keyObj="name"
                  name="Repetir contraseña"
                />

                <Container
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    marginTop: "10px",
                  }}
                >
                  <div className="form-group">
                    {isSubmitting && (
                      <img
                        alt="ddd"
                        src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
                      />
                    )}
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isSubmitting}
                    >
                      Hacer solicitud
                    </button>
                  </div>
                </Container>

                {status && (
                  <Snackbar
                    open={open}
                    autoHideDuration={2000}
                    onClose={handleClose}
                  >
                    <Alert onClose={handleClose} severity="error">
                      {status}
                    </Alert>
                  </Snackbar>
                )}
              </Form>
            )}
          />
        </div>
      </Card>
    </Container>
  );
}
