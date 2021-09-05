import { FunctionComponent, useEffect } from "react";
import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import { Card, CardHeader } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Grid from "@material-ui/core/Grid";

interface FilterSetupProps {}

const FilterSetup: FunctionComponent<FilterSetupProps> = () => {
  const [classesCheckbox, setClassesCheckbox] = React.useState({
    checkedBeast: false,
    checkedAqua: false,
    checkedPlant: false,
    checkedBird: false,
    checkedBug: false,
    checkedReptile: false,
    checkedMech: false,
    checkedDawn: false,
    checkedDusk: false,
  });
  const [breed, setBreed] = React.useState([0, 7]);

  const axieClasses: string[] = [
    "Beast",
    "Aqua",
    "Plant",
    "Bird",
    "Bug",
    "Reptile",
    "Mech",
    "Dawn",
    "Dusk",
  ];
  const handleClassChange = (axieClass: string, event: any) => {
    let x = "checked" + axieClass;
    setClassesCheckbox({ ...classesCheckbox, [x]: event.target.checked });
  };

  const handleBreedChange = (event: any, newValue: any) => {
    setBreed(newValue);
  };

  useEffect(() => {
    console.log(classesCheckbox);
  }, [classesCheckbox]);

  return (
    <div>
      <Typography variant="h5">Class</Typography>
      <FormGroup row>
        {axieClasses.map((axieClass) => {
          return (
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(e) => handleClassChange(axieClass, e)}
                  name={axieClass}
                  color="primary"
                />
              }
              label={axieClass}
            />
          );
        })}
      </FormGroup>
      <div style={{ marginTop: 20 }}>
        <Grid container spacing={5}>
          <Grid item xs={2}>
            <Typography variant="h5">Breed</Typography>
          </Grid>
          <Grid item xs>
            {breed[0]}
          </Grid>
          <Grid item xs={7}>
            <Slider
              value={breed}
              onChange={handleBreedChange}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              getAriaValueText={valuetext}
              max={7}
              min={0}
            />
          </Grid>
          <Grid item xs>
            {breed[1]}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default FilterSetup;

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props: any) => <Checkbox color="default" {...props} />);

function valuetext(value: any) {
  return `${value}°C`;
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));
