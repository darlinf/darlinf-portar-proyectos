import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Button, Container } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Box from "@material-ui/core/Box";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Menu from "@material-ui/core/Menu";

import { teacherService } from "../../_services/teacher.service";
import { authenticationService } from "../../_services/authentication.service";

const teacher = authenticationService.currentUserValue();

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },

  root2: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 700,
    margin: "auto",
    marginBottom: "10px",
  },
  divider: {
    height: 28,
    margin: 4,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  hr: {
    margin: 0,
    marginBottom: 13,
  },
}));

export default function ManageFinalProjectsTeacher() {
  const handleSetValue = (value, button, elem) => {
    let stateTo = button === "Aprobar" ? "approved" : "approved and not";
    let itemUpdate = {
      ImageSRC: elem.imageSRC,
      FinalDocumentationSRC: elem.finalDocumentationSRC,
      Description: elem.description,
      name: elem.name,
      studentId: elem.studentId,
      state: stateTo,
      examGrade: value,
    };
    console.log(itemUpdate);
    //updateApi(itemUpdate);
  };

  function SimpleMenu({ name, color, styles, elem }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <div>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
          size="small"
          style={styles}
          variant="contained"
          color={color}
        >
          {name}
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            onClick={() => {
              handleClose();
              handleSetValue("A", name, elem);
            }}
          >
            A
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              handleSetValue("B", name, elem);
            }}
          >
            B
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              handleSetValue("C", name, elem);
            }}
          >
            C
          </MenuItem>
        </Menu>
      </div>
    );
  }

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const [items, setItems] = useState([]);
  const [showLinearProgress, setShowLinearProgress] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [age, setAge] = React.useState("");

  const handleChange2 = (event) => {
    setAge(event.target.value);
  };

  const updateApi = (elem) => {
    setShowLinearProgress(true);
    teacherService
      .updateFinalProject(elem)
      .then(() => {
        getApi();
        setShowLinearProgress(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getApi = () => {
    teacherService
      .getAllFinalProjectForEvaluate(1, "all", "all")
      .then((data) => {
        setItems(data);

        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getApi();
  }, []);

  const ShowData = () => {
    if (items[0])
      return items.map((item) => {
        return (
          <div key={item.studentId}>
            <Accordion
              expanded={expanded === "panel1" + item.studentId}
              onChange={handleChange("panel1" + item.studentId)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <Typography>
                      Estudiante:{" "}
                      <Typography
                        component="span"
                        style={{ fontWeight: "bold" }}
                      >
                        {item.studenName}
                      </Typography>
                    </Typography>
                    <Typography>
                      Matricula:{" "}
                      <Typography
                        component="span"
                        style={{ fontWeight: "bold" }}
                      >
                        {item.enrollment}
                      </Typography>
                    </Typography>
                    <Typography>
                      Proyecto:{" "}
                      <Typography
                        component="span"
                        style={{ fontWeight: "bold" }}
                      >
                        {item.name}
                      </Typography>
                    </Typography>
                  </Box>
                  <Box
                    onClick={(event) => event.stopPropagation()}
                    onFocus={(event) => event.stopPropagation()}
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Box></Box>
                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "57%",
                        marginTop: "13px",
                      }}
                    >
                      <Button
                        size="small"
                        style={{ width: 85, height: 20 }}
                        variant="contained"
                        color="secondary"
                      >
                        Reeprobar
                      </Button>
                      <SimpleMenu
                        name="Aprobar sin publicar"
                        color=""
                        elem={item}
                        styles={{ width: 180, height: 20 }}
                      ></SimpleMenu>
                      <SimpleMenu
                        name="Aprobar"
                        color="primary"
                        elem={item}
                        styles={{ width: 73, height: 20 }}
                      ></SimpleMenu>
                    </Box>
                  </Box>
                </Box>
              </AccordionSummary>
              <hr className={classes.hr}></hr>
              <AccordionDetails>
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                  }}
                >
                  <CardMedia
                    style={{ height: 170, width: "40%" }}
                    image={"https://localhost:5001/" + item.imageSRC}
                    title="Contemplative Reptile"
                  />
                  <CardContent style={{ height: 170, width: "60%" }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {item.name}
                    </Typography>
                    <Typography
                      className="lizardsStyle"
                      style={{ overflowY: "scroll", height: 100 }}
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {item.description}
                    </Typography>
                  </CardContent>
                </Box>
              </AccordionDetails>
            </Accordion>
          </div>
        );
      });
    else
      return (
        <Container
          style={{
            display: "flex",
            justifyContent: "center",
            width: 700,
            padding: 0,
          }}
        >
          <CircularProgress />
        </Container>
      );
  };

  return (
    <Container style={{ width: 750, marginTop: 50 }}>
      <Typography
        style={{ textAlign: "center", marginBottom: "10px", fontSize: 40 }}
      >
        Gestionar proyectos finales
      </Typography>
      <Paper component="form" className={classes.root2}>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">
            Seleccionar por estado
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            onChange={handleChange2}
            style={{ border: "none", width: 200 }}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">
            Seleccionar por seccion
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            onChange={handleChange2}
            style={{ border: "none", width: 200 }}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>

        <Divider className={classes.divider} orientation="vertical" />
        <InputBase
          className={classes.input}
          placeholder="Buscar por matricula"
          inputProps={{ "aria-label": "search google maps" }}
        />
      </Paper>
      <div className={classes.root}>
        <ShowData></ShowData>
      </div>
    </Container>
  );
}
