import { FunctionComponent, useContext, useEffect, useState } from "react";
import React from "react";
import { createStyles, Theme, withStyles, makeStyles, createTheme } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Grid from "@material-ui/core/Grid";
import { Button, colors } from "@material-ui/core";
import { Chip } from "@material-ui/core";
import Autocomplete, { createFilterOptions } from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import "./FilterSetup.css";
import { FiltersContext } from "../store/filters-context";
import AxieFilters from "../model/filters";
import Popover from "@material-ui/core/Popover";
import SaveIcon from "@material-ui/icons/Save";
import Paper from "@material-ui/core/Paper";
import { BodyPart, SelectedLabel } from "./BodyPart";
import "./BodyPart.css";
import Aqua from "../images/classes/class_aquatic.svg";
import Beast from "../images/classes/class_beast.svg";
import Bird from "../images/classes/class_bird.svg";
import Bug from "../images/classes/class_bug.svg";
import Plant from "../images/classes/class_plant.svg";
import Reptile from "../images/classes/class_reptile.svg";
import Mech from "../images/classes/class_mech.svg";
import Dawn from "../images/classes/class_dawn.svg";
import Dusk from "../images/classes/class_dusk.svg";
import Breed from "../images/stats/Breed.svg";
import Breed1 from "../images/stats/Breed-1.svg";
import Breed2 from "../images/stats/Breed-2.svg";
import Health from "../images/stats/Health.svg";
import Health1 from "../images/stats/Health-1.svg";
import Health2 from "../images/stats/Health-2.svg";
import Speed from "../images/stats/Speed.svg";
import Speed1 from "../images/stats/Speed-1.svg";
import Speed2 from "../images/stats/Speed-2.svg";
import Skill from "../images/stats/Skill.svg";
import Skill1 from "../images/stats/Skill-1.svg";
import Skill2 from "../images/stats/Skill-2.svg";
import Morale from "../images/stats/Morale.svg";
import Morale1 from "../images/stats/Morale-1.svg";
import Morale2 from "../images/stats/Morale-2.svg";

export class AxieParts {
  partId: string;
  card: string;
  part: string;
  energy: number;
  atk: number;
  def: number;
  info: string;
  constructor(partId: string, card: string, part: string, energy: number, atk: number, def: number, info: string) {
    this.partId = partId;
    this.card = card;
    this.part = part;
    this.energy = energy;
    this.atk = atk;
    this.def = def;
    this.info = info;
  }
}

interface FilterSetupProps {}

const FilterSetup: FunctionComponent<FilterSetupProps> = () => {
  const filtersCtx = useContext(FiltersContext);
  const [classesCheckbox, setClassesCheckbox] = useState<any>({
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

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const [parts, setParts] = useState<AxieParts[] | undefined>();
  const [breed, setBreed] = useState<[number, number]>([0, 7]);
  const [health, setHealth] = useState<[number, number]>([27, 61]);
  const [speed, setSpeed] = useState<[number, number]>([27, 61]);
  const [skill, setSkill] = useState<[number, number]>([27, 61]);
  const [morale, setMorale] = useState<[number, number]>([27, 61]);
  const [name, setName] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [checkbox, setCheckbox] = useState(false);

  const filterOptions = createFilterOptions({
    matchFrom: "any",
    limit: 10,
  });

  const styles = {
    container: {
      display: "flex",
      flexWrap: "wrap",
    },
    textField: {
      width: 300,
      margin: 100,
    },
    //style for font size
    resize: {
      fontSize: 20,
    },
  };

  const axieClasses: string[] = ["Aqua", "Beast", "Plant", "Bird", "Bug", "Reptile", "Dawn", "Mech", "Dusk"];
  const resetFilters = () => {
    setParts((prevState) => []);
    setBreed([0, 7]);
    setHealth([27, 61]);
    setSpeed([27, 61]);
    setSkill([27, 61]);
    setMorale([27, 61]);
    setName("");
    setClassesCheckbox({
      ...classesCheckbox,
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
  };

  const classImg = (axieClass: string) => {
    switch (axieClass) {
      case "Aqua":
        return Aqua;
      case "Beast":
        return Beast;
      case "Bird":
        return Bird;
      case "Bug":
        return Bug;
      case "Plant":
        return Plant;
      case "Reptile":
        return Reptile;
      case "Mech":
        return Mech;
      case "Dawn":
        return Dawn;
      case "Dusk":
        return Dusk;
    }
  };

  const handleClassChange = (axieClass: string, event: any) => {
    let x = "checked" + axieClass;
    setClassesCheckbox({ ...classesCheckbox, [x]: event.target.checked });
  };

  const handleBreedChange = (event: any, newValue: any) => {
    setBreed(newValue);
  };
  const handleHealthChange = (event: any, newValue: any) => {
    setHealth(newValue);
  };
  const handleSpeedChange = (event: any, newValue: any) => {
    setSpeed(newValue);
  };
  const handleSkillChange = (event: any, newValue: any) => {
    setSkill(newValue);
  };
  const handleMoraleChange = (event: any, newValue: any) => {
    setMorale(newValue);
  };
  const handlePartChange = (event: any, newValue: any) => {
    console.log(newValue);
    console.log(parts);
    console.log(filtersCtx.items);
    setParts(newValue);
  };
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBtnDisabled(!event.target.value);
    setName(event.target.value);
  };

  // TODO: make it such that on change can change any value u want, onblur then will correct
  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>, statPicker: string, minMax: string) => {
    // get index to change
    let statIdx: number = minMax === "min" ? 0 : 1;
    console.log(statIdx);

    // get max stat for checking
    let statMinMax: [number, number] = statPicker === "Breed" ? [0, 7] : [0, 61]; // get stat from state

    // assign classPicked to the array in the picked class passed in

    let classPicked: [number, number];
    let value = parseInt(event.target.value, 10); // to integer

    switch (statPicker) {
      case "Breed":
        classPicked = [breed[0], breed[1]];
        break;
      case "Health":
        classPicked = [health[0], health[1]];
        break;
      case "Speed":
        classPicked = [speed[0], speed[1]];
        break;
      case "Skill":
        classPicked = [skill[0], skill[1]];
        break;
      case "Morale":
        classPicked = [morale[0], morale[1]];
        break;
      default:
        classPicked = statMinMax;
    }
    // statPicker === "Breed" ? [breed[0], breed[1]] : "Health" ? [health[0], health[1]] : "Speed" ? [speed[0], speed[1]] : "Skill" ? [skill[0], skill[1]] : [morale[0], morale[1]]; // assign

    // if value entered is within the min max range
    if (value >= statMinMax[0] && value <= statMinMax[1]) {
      classPicked[statIdx] = value; // assign value to the idx (min or max)
      switch (statPicker) {
        case "Breed":
          setBreed(classPicked);
          break;
        case "Health":
          setHealth(classPicked);
          break;
        case "Speed":
          setSpeed(classPicked);
          break;
        case "Skill":
          setSkill(classPicked);
          break;
        case "Morale":
          setMorale(classPicked);
          break;
      }
    }
  };

  const handleValueCheck = (event: React.FocusEvent<HTMLInputElement>, statPicker: string, minMax: string) => {
    switch (statPicker) {
      case "Health":
        if (health[0] < 27) {
          setHealth([27, health[1]]);
        }
        if (health[1] > 61) {
          setHealth([health[0], 61]);
        } else if (health[1] < 27) {
          setHealth([health[0], 27]);
        }
        break;
      case "Speed":
        if (speed[0] < 27) {
          setSpeed([27, speed[1]]);
        }
        if (speed[1] > 61) {
          setSpeed([speed[0], 61]);
        } else if (speed[1] < 27) {
          setSpeed([speed[0], 27]);
        }
        break;
      case "Skill":
        if (skill[0] < 27) {
          setSkill([27, skill[1]]);
        }
        if (skill[1] > 61) {
          setSkill([skill[0], 61]);
        } else if (skill[1] < 27) {
          setSkill([skill[0], 27]);
        }
        break;
      case "Morale":
        if (morale[0] < 27) {
          setMorale([27, morale[1]]);
        }
        if (morale[1] > 61) {
          setMorale([morale[0], 61]);
        } else if (morale[1] < 27) {
          setMorale([morale[0], 27]);
        }
        break;
    }
  };

  const handleCreateFilter = (e: React.MouseEvent<HTMLButtonElement>) => {
    const asArray = Object.entries(classesCheckbox);
    const filtered = asArray.filter(([key, value]) => value === true);
    const filteredClasses: any = [];
    filtered.forEach((element) => {
      filteredClasses.push(element[0].slice(7));
    });
    const newFilter = new AxieFilters(name, filteredClasses, parts, breed, health, speed, skill, morale);
    filtersCtx.addAxieFilters(newFilter);
    // console.log(newFilter);
    resetFilters();
    handleClick(e);
    setBtnDisabled(true);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setTimeout(() => handleClose(), 1800);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteLabelHandler = (card: string, part: string) => {
    let x: AxieParts[] | undefined = parts;
    console.log(x);
    console.log(card);
    console.log(part);
    let y: AxieParts[] | undefined = x?.filter((selectedPart: any) => !(selectedPart.partId === part && selectedPart.card === card));
    console.log(y);
    setParts((prevState) => y);
    // setParts(y);
  };

  const axieStats: any[] = [
    { name: "Breed", value: breed, set: setBreed, handler: handleBreedChange, min: 0, max: 7 },
    { name: "Health", value: health, set: setHealth, handler: handleHealthChange, min: 27, max: 61 },
    { name: "Speed", value: speed, set: setSpeed, handler: handleSpeedChange, min: 27, max: 61 },
    { name: "Skill", value: skill, set: setSkill, handler: handleSkillChange, min: 27, max: 61 },
    { name: "Morale", value: morale, set: setMorale, handler: handleMoraleChange, min: 27, max: 61 },
  ];

  return (
    <div>
      <div className="wrapping-container" style={{ marginBottom: 10 }}>
        <div className="black" style={{ marginBottom: 15 }}>
          Body Parts & Cards
          <Autocomplete
            onChange={(event: any, value: any | null) => handlePartChange(event, value)}
            multiple
            value={parts}
            id="tags-standard"
            options={axieParts}
            getOptionLabel={(option) => {
              return `${option.partId} || ${option.card}`;
            }}
            PaperComponent={({ children }) => <Paper style={{ backgroundColor: "rgba(0,0,0,0.8)" }}>{children}</Paper>}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <div style={{ paddingLeft: 5, paddingRight: 5 }}>
                  <SelectedLabel
                    partId={option.partId}
                    card={option.card}
                    classification={option.part}
                    onDelete={deleteLabelHandler.bind(null, option.card, option.partId)}
                    {...getTagProps({ index })}
                  />
                  {/* <Chip variant="outlined" label={option.card} size="small" {...getTagProps({ index })} /> */}
                </div>
              ))
            }
            renderOption={(option) => <BodyPart partId={option.partId} card={option.card} classification={option.part} energy={option.energy} atk={option.atk} def={option.def} info={option.info} />}
            renderInput={(params) => <TextField {...params} variant="standard" label={<div className="regular">Select body parts / card abilities</div>} />}
          />
        </div>
        <div className="black">Class</div>
        <FormGroup row>
          {axieClasses.map((axieClass) => {
            let checkAxieClass = "checked" + axieClass;
            let axieIcon = classImg(axieClass);
            return (
              <FormControlLabel
                control={<Checkbox key={axieClass[0]} size="small" color="primary" onChange={(e) => handleClassChange(axieClass, e)} name={axieClass} checked={classesCheckbox[checkAxieClass]} />}
                label={
                  <div className="regular" style={{ display: "flex", fontSize: 14, width: 100 }}>
                    <img style={{ width: 20, marginRight: 10 }} src={axieIcon} alt="" />
                    {axieClass}
                  </div>
                }
              />
            );
          })}
        </FormGroup>
        <div style={{ marginTop: 15 }}>
          {axieStats.map((axieStat) => {
            let statIcon;
            switch (axieStat.name) {
              case "Breed":
                statIcon = Breed;
                break;
              case "Health":
                statIcon = Health;
                break;
              case "Speed":
                statIcon = Speed;
                break;
              case "Skill":
                statIcon = Skill;
                break;
              case "Morale":
                statIcon = Morale;
                break;
            }
            let statText = axieStat.name.toUpperCase();

            return (
              <Grid container spacing={1} key={axieStat[0]} justifyContent="center" alignItems="center">
                <Grid item xs={2}>
                  <div className="bold" style={{ fontSize: 10 }}>
                    <img src={statIcon} style={{ height: 15, paddingRight: 5, width: 15, marginBottom: -3 }} alt="" />
                    {/* {axieStat.name} */}
                    {statText}
                  </div>
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    size="small"
                    margin="dense"
                    variant="outlined"
                    className="regular"
                    label="Min"
                    type="number"
                    inputProps={{ style: { textAlign: "center", width: 35, padding: 5, fontSize: 12 } }}
                    InputLabelProps={{ style: { fontFamily: "Lato", fontSize: 12 } }}
                    value={axieStat.value[0]}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleValueChange(event, axieStat.name, "min")}
                    onBlur={(event: React.FocusEvent<HTMLInputElement>) => handleValueCheck(event, axieStat.name, "min")}
                  />
                </Grid>
                <Grid item xs>
                  {axieStat.name === "Breed" ? (
                    <BreedSlider
                      value={axieStat.value}
                      onChange={axieStat.handler}
                      valueLabelDisplay="auto"
                      aria-labelledby="range-slider"
                      getAriaValueText={statValueText}
                      max={axieStat.max}
                      min={axieStat.min}
                    />
                  ) : axieStat.name === "Health" ? (
                    <HealthSlider
                      value={axieStat.value}
                      onChange={axieStat.handler}
                      valueLabelDisplay="auto"
                      aria-labelledby="range-slider"
                      getAriaValueText={statValueText}
                      max={axieStat.max}
                      min={axieStat.min}
                    />
                  ) : axieStat.name === "Speed" ? (
                    <SpeedSlider
                      value={axieStat.value}
                      onChange={axieStat.handler}
                      valueLabelDisplay="auto"
                      aria-labelledby="range-slider"
                      getAriaValueText={statValueText}
                      max={axieStat.max}
                      min={axieStat.min}
                    />
                  ) : axieStat.name === "Skill" ? (
                    <SkillSlider
                      value={axieStat.value}
                      onChange={axieStat.handler}
                      valueLabelDisplay="auto"
                      aria-labelledby="range-slider"
                      getAriaValueText={statValueText}
                      max={axieStat.max}
                      min={axieStat.min}
                    />
                  ) : (
                    <MoraleSlider
                      value={axieStat.value}
                      onChange={axieStat.handler}
                      valueLabelDisplay="auto"
                      aria-labelledby="range-slider"
                      getAriaValueText={statValueText}
                      max={axieStat.max}
                      min={axieStat.min}
                    />
                  )}
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    size="small"
                    margin="dense"
                    variant="outlined"
                    className="black"
                    label="Max"
                    type="number"
                    inputProps={{ style: { textAlign: "center", width: 35, padding: 5, fontSize: 12 } }}
                    InputLabelProps={{ style: { fontFamily: "Lato", fontSize: 12 } }}
                    value={axieStat.value[1]}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleValueChange(event, axieStat.name, "max")}
                    onBlur={(event: React.FocusEvent<HTMLInputElement>) => handleValueCheck(event, axieStat.name, "max")}
                  />
                </Grid>
                <Grid item xs={1} />
              </Grid>
            );
          })}
        </div>
      </div>
      <Grid container>
        <Grid item xs={7}>
          <TextField
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleNameChange(event)}
            size="small"
            id="outlined-basic"
            label="Preset Filter Name"
            inputProps={{ style: { fontFamily: "Lato", fontSize: 14 } }}
            InputLabelProps={{ style: { fontFamily: "Lato", fontSize: 14 } }}
            variant="outlined"
            value={name}
            fullWidth={true}
          />
        </Grid>
        <Grid item xs={1}>
          <div></div>
        </Grid>
        <Grid item xs={1}>
          <Button aria-describedby={id} onClick={(e) => handleCreateFilter(e)} disabled={btnDisabled} color="primary" variant="contained" startIcon={<SaveIcon />}>
            Save
          </Button>
          <Popover
            style={{ marginLeft: 30 }}
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <Typography style={{ padding: 10 }}>
              <div className="regular">Preset Created 🎉</div>
              <div className="regular" style={{ fontSize: 12 }}>
                Check Market Filter Tab!
              </div>
            </Typography>
          </Popover>
        </Grid>
        <Grid item xs={2}>
          <div></div>
        </Grid>
      </Grid>
    </div>
  );
};

export default FilterSetup;

function statValueText(value: any) {
  return `${value}`;
}
const theme = createTheme({
  typography: {
    // In Chinese and Japanese the characters are usually larger,
    // so a smaller fontsize may be appropriate.
    fontSize: 21,
  },
});

const axieParts = [
  // aqua
  { partId: "Hermit", card: "Shelter", part: "AquaBack", energy: 1, atk: 0, def: 115, info: "Disable critical strikes on this Axie during this round." },
  { partId: "Blue Moon", card: "Scale Dart", part: "AquaBack", energy: 1, atk: 120, def: 30, info: "Draw a card if target is in Last Stand." },
  { partId: "Goldfish", card: "Swift Escape", part: "AquaBack", energy: 1, atk: 110, def: 20, info: "Apply Speed+ to this Axie for 2 rounds when attacked." },
  { partId: "Sponge", card: "Shipwreck", part: "AquaBack", energy: 1, atk: 60, def: 90, info: "Apply Attack+ to this Axie if its shield breaks." },
  { partId: "Anemone", card: "Aqua Vitality", part: "AquaBack", energy: 1, atk: 80, def: 40, info: "Successful attacks restore 50 HP for each Anemone part this Axie posseses." },
  { partId: "Anemone", card: "Aquaponics", part: "AquaHorn", energy: 1, atk: 80, def: 40, info: "Successful attacks restore 50 HP for each Anemone part this Axie posseses." },
  { partId: "Perch", card: "Spinal Trap", part: "AquaHorn", energy: 1, atk: 100, def: 20, info: "Prioritize idle target when comboed with at least 2 additional cards." },
  { partId: "Babylonia", card: "Shell Jab", part: "AquaHorn", energy: 1, atk: 100, def: 50, info: "Deal 130% damage when attacking an idle target." },
  { partId: "Teal Shell", card: "Deep Sea Gore", part: "AquaHorn", energy: 1, atk: 50, def: 80, info: "Add 30% to this Axie's shield when attacking." },
  { partId: "Clamshell", card: "Clam Slash", part: "AquaHorn", energy: 1, atk: 110, def: 40, info: "Apply Attack+ to this Axie when attacking Beast, Bug, or Mech targets." },
  { partId: "Oranda", card: "Hero's Bane", part: "AquaHorn", energy: 1, atk: 120, def: 30, info: "End target's Last Stand." },
  { partId: "Shoal Star", card: "Star Shuriken", part: "AquaHorn", energy: 1, atk: 115, def: 10, info: "Target cannot enter Last Stand if this card brings its HP to zero." },
  { partId: "Lam", card: "Angry Lam", part: "AquaMouth", energy: 1, atk: 110, def: 40, info: "Deal 120% damage if this Axie's HP is below 50%." },
  { partId: "Catfish", card: "Swallow", part: "AquaMouth", energy: 1, atk: 80, def: 30, hp: 80, info: "Heal this Axie by the damage inflicted with this card." },
  { partId: "Risky Fish", card: "Fish Hook", part: "AquaMouth", energy: 1, atk: 110, def: 30, info: "Apply Attack+ to this Axie when attacking Plant, Reptile, or Dusk targets." },
  { partId: "Piranha", card: "Crimson Water", part: "AquaMouth", energy: 1, atk: 120, def: 30, info: "Target injured enemy if this Axie's HP is below 50%." },
  { partId: "Koi", card: "Upstream Swim", part: "AquaTail", energy: 1, atk: 110, def: 30, info: "Apply Speed+ to this Axie for 2 rounds when comboed with another Aquatic class card." },
  { partId: "Nimo", card: "Tail Slap", part: "AquaTail", energy: 0, atk: 30, def: 0, info: "Gain 1 energy when comboed with another card." },
  { partId: "Tadpole", card: "Black Bubble", part: "AquaTail", energy: 1, atk: 110, def: 40, info: "Apply Jinx to target for 2 rounds." },
  { partId: "Ranchu", card: "Water Sphere", part: "AquaTail", energy: 1, atk: 120, def: 30, info: "Apply Chill to target for 2 rounds." },
  { partId: "Navaga", card: "Flanking Smack", part: "AquaTail", energy: 1, atk: 100, def: 40, info: "Deal 120% damage if this Axie attacks first." },
  { partId: "Shrimp", card: "Chitin Jump", part: "AquaTail", energy: 1, atk: 30, def: 30, info: "Prioritizes furthest target" },
  // beast
  { partId: "Ronin", card: "Single Combat", part: "BeastBack", energy: 1, atk: 75, def: 0, info: "Guaranteed critical strike when comboed with at least 2 other cards." },
  { partId: "Hero", card: "Heroic Reward", part: "BeastBack", energy: 0, atk: 60, def: 0, info: "Draw a card when attacking an Aquatic, Bird, or Dawn target." },
  { partId: "Jaguar", card: "Nitro Leap", part: "BeastBack", energy: 1, atk: 115, def: 35, info: "Always strike first if this Axie is in Last Stand." },
  { partId: "Risky Beast", card: "Revenge Arrow", part: "BeastBack", energy: 1, atk: 125, def: 25, info: "Deal 150% damage if this Axie is in Last Stand." },
  { partId: "Timber", card: "Woodman Power", part: "BeastBack", energy: 1, atk: 50, def: 100, info: "Add Shield equal to the damage this cards deals to Plant targets." },
  { partId: "Furball", card: "Juggling Balls", part: "BeastBack", energy: 1, atk: 40, def: 30, info: "Strike 3 times." },
  { partId: "Little Branch", card: "Branch Charge", part: "BeastHorn", energy: 1, atk: 125, def: 25, info: "Increase crit chance by 20% if chained or comboed with a plant card." },
  { partId: "Imp", card: "Ivory Stab", part: "BeastHorn", energy: 1, atk: 70, def: 20, info: "Gain 1 energy per critical strike dealt by your team this round." },
  { partId: "Merry", card: "Merry Legion", part: "BeastHorn", energy: 1, atk: 65, def: 85, info: "Add 20% shield to this Axie when played in a chain." },
  { partId: "Pocky", card: "Sugar Rush", part: "BeastHorn", energy: 1, atk: 125, def: 20, info: "Deal 10% additional damage for each allied Bug Axie." },
  { partId: "Dual Blade", card: "Sinister Strike", part: "BeastHorn", energy: 1, atk: 130, def: 20, info: "Deal 250% damage on critical strikes." },
  { partId: "Arco", card: "Acrobatics", part: "BeastHorn", energy: 1, atk: 100, def: 50, info: "Apply Speed + to this Axie for 2 rounds when attacked." },
  { partId: "Nut Cracker", card: "Nut Crack", part: "BeastMouth", energy: 1, atk: 105, def: 30, info: "Deal 120% damage when comboed with another 'Nut Cracker' card." },
  { partId: "Goda", card: "Piercing Sound", part: "BeastMouth", energy: 1, atk: 80, def: 40, info: "Destoy 1 of your opponent's energy." },
  { partId: "Axie Kiss", card: "Death Mark", part: "BeastMouth", energy: 1, atk: 100, def: 30, info: "Apply Lethal to target if this Axie's HP is below 30%." },
  { partId: "Confident", card: "Self Rally", part: "BeastMouth", energy: 0, atk: 0, def: 30, info: "Apply 2 Morale+ to this Axie for 2 rounds." },
  { partId: "Cottontail", card: "Luna Absorb", part: "BeastTail", energy: 0, atk: 0, def: 0, info: "Gain 1 energy." },
  { partId: "Rice", card: "Night Steal", part: "BeastTail", energy: 1, atk: 80, def: 10, info: "Steal 1 energy from your opponent when comboed with another card." },
  { partId: "Shiba", card: "Rampant Howl", part: "BeastTail", energy: 1, atk: 120, def: 30, info: "Apply Morale+ to your team for 2 rounds if this Axie attacks while in Last Stand." },
  { partId: "Hare", card: "Hare Dagger", part: "BeastTail", energy: 1, atk: 120, def: 30, info: "Draw a card if this Axie attacks at the beginning of the round." },
  { partId: "Nut Cracker", card: "Nut Throw", part: "BeastTail", energy: 1, atk: 105, def: 30, info: "Deal 120% damage when comboed with another 'Nut Cracker' card." },
  { partId: "Gerbil", card: "Gerbil Jump", part: "BeastTail", energy: 1, atk: 40, def: 20, info: "Skip the closest target if there are 2 or more enemies remaining." },
  // bird
  { partId: "Balloon", card: "Balloon Pop", part: "BirdBack", energy: 0, atk: 40, def: 0, info: "Apply Fear to target for 1 turn. If defending, apply Fear to self until next round." },
  { partId: "Cupid", card: "Heart Break", part: "BirdBack", energy: 1, atk: 120, def: 20, info: "Apply Morale- to enemy for 2 rounds." },
  { partId: "Raven", card: "Ill-omened", part: "BirdBack", energy: 1, atk: 110, def: 30, info: "Apply Jinx to target for 2 rounds." },
  { partId: "Pigeon Post", card: "Blackmail", part: "BirdBack", energy: 1, atk: 120, def: 10, info: "Transfer all debuffs on this Axie to target." },
  { partId: "Kingfisher", card: "Patient hunter", part: "BirdBack", energy: 1, atk: 130, def: 0, info: "Target an Aquatic class enemy if this Axie's HP is below 50%" },
  { partId: "Tri Feather", card: "Triple Threat", part: "BirdBack", energy: 0, atk: 30, def: 10, info: "Attack twice if this Axie has any debuffs." },
  { partId: "Eggshell", card: "Eggbomb", part: "BirdHorn", energy: 1, atk: 120, def: 0, info: "Apply Aroma on this Axie until next round." },
  { partId: "Cuckoo", card: "Cockadoodledoo", part: "BirdHorn", energy: 0, atk: 0, def: 40, info: "Apply Attack+ to this Axie." },
  { partId: "Trump", card: "Air Force One", part: "BirdHorn", energy: 1, atk: 120, def: 30, info: 'Deal 120% damage when chained with another "Trump" card.' },
  { partId: "Kestrel", card: "Headshot", part: "BirdHorn", energy: 1, atk: 130, def: 0, info: "Disable target's horn cards next round." },
  { partId: "Wing Horn", card: "Smart Shot", part: "BirdHorn", energy: 1, atk: 50, def: 10, info: "Skip the closest target if there are 2 or more enemies remaining." },
  { partId: "Feather Spear", card: "Feather Lunge", part: "BirdHorn", energy: 1, atk: 110, def: 50, info: 'Deal 120% damage when chained with another "Lunge" card.' },
  { partId: "Doubletalk", card: "Soothing Song", part: "BirdMouth", energy: 1, atk: 80, def: 0, info: "Apply Sleep to target." },
  { partId: "Peace maker", card: "Peace Traety", part: "BirdMouth", energy: 1, atk: 120, def: 30, info: "Apply Attack- on target." },
  { partId: "Hungry Bird", card: "Insectivore", part: "BirdMouth", energy: 1, atk: 110, def: 40, info: "Target Bug class enemy if this Axie's HP is below 50%." },
  { partId: "Little Owl", card: "Dark Swoop", part: "BirdMouth", energy: 1, atk: 25, def: 0, info: "Target fastest enemy." },
  { partId: "Swallow", card: "Early Bird", part: "BirdTail", energy: 1, atk: 110, def: 20, info: "Deal 120% damage if this Axie attacks first." },
  { partId: "Feather Fan", card: "Sunder Armor", part: "BirdTail", energy: 1, atk: 40, def: 90, info: "Add 20% shield to this Axie for each debuff it possesses." },
  { partId: "The Last One", card: "Risky Feather", part: "BirdTail", energy: 1, atk: 150, def: 0, info: "Apply 2 Attack- to this Axie." },
  { partId: "Cloud", card: "Puffy Smack", part: "BirdTail", energy: 1, atk: 100, def: 50, info: "Skip targets that are in Last Stand." },
  { partId: "Granma's Fan", card: "Cool Breeze", part: "BirdTail", energy: 1, atk: 120, def: 30, info: "Apply Chill to target for 2 rounds." },
  { partId: "Post Fight", card: "All-out Shot", part: "BirdTail", energy: 0, atk: 120, def: 0, info: "Inflict 30% of this Axie's max HP to itself." },
  // bug
  { partId: "Snail Shell", card: "Sticky Goo", part: "BugBack", energy: 1, atk: 40, def: 60, info: "Stun attacker if this Axie’s shield breaks. Can only trigger once per round." },
  { partId: "Garish Worm", card: "Barb Strike", part: "BugBack", energy: 1, atk: 100, def: 50, info: "Apply poison to target when played in a chain." },
  { partId: "Buzz Buzz", card: "Bug Noise", part: "BugBack", energy: 1, atk: 100, def: 40, info: "Apply Attack- to target." },
  { partId: "Sandal", card: "Bug Splat", part: "BugBack", energy: 1, atk: 110, def: 50, info: "Deal 50% more damage when attacking Bug targets." },
  { partId: "Scarab", card: "Scarab Curse", part: "BugBack", energy: 1, atk: 100, def: 40, info: "Target cannot be healed until next round." },
  { partId: "Spiky Wing", card: "Buzzing Wind", part: "BugBack", energy: 0, atk: 10, def: 30, info: "Apply Fragile to target until next round." },
  { partId: "Lagging", card: "Mystic Rush", part: "BugHorn", energy: 0, atk: 40, def: 0, info: "Apply Speed- to target for 2 rounds." },
  { partId: "Antenna", card: "Bug Signal", part: "BugHorn", energy: 1, atk: 80, def: 60, info: 'Steal energy from your opponent when chained with another "Bug Signal" card.' },
  { partId: "Caterpillars", card: "Grab Surprise", part: "BugHorn", energy: 1, atk: 100, def: 60, info: "Apply Fear to shielded targets." },
  { partId: "Pliers", card: "Dull Grip", part: "BugHorn", energy: 0, atk: 140, def: 0, info: "Deal 30% more damage to shielded targets." },
  { partId: "Parasite", card: "Third Glance", part: "BugHorn", energy: 1, atk: 90, def: 50, info: "Randomly discard 1 card from your enemy's hand." },
  { partId: "Leaf Bug", card: "Disguise", part: "BugHorn", energy: 0, atk: 20, def: 20, info: "Gain 1 energy when comboed with a plant card." },
  { partId: "Mosquito", card: "Blood Taste", part: "BugMouth", energy: 1, atk: 70, def: 40, info: "Heal this Axie by the damage inflicted with this card." },
  { partId: "Pincer", card: "Sunder Claw", part: "BugMouth", energy: 0, atk: 20, def: 20, info: "Randomly discard 1 card from your enemy's hand." },
  { partId: "Cute Bunny", card: "Terror Chomp", part: "BugMouth", energy: 1, atk: 120, def: 30, info: "Apply Fear to target for 2 turns when played in a Chain." },
  { partId: "Square Teeth", card: "Mite Bite", part: "BugMouth", energy: 0, atk: 30, def: 0, info: "Add 100% more damage when comboed with another card." },
  { partId: "Ant", card: "Chemical Warfare", part: "BugTail", energy: 0, atk: 30, def: 80, info: "Apply Stench to enemy for 1 round." },
  { partId: "Twin Tail", card: "Twin Needle", part: "BugTail", energy: 0, atk: 30, def: 0, info: "Attack twice when comboed with another card." },
  { partId: "Fish Snack", card: "Anesthetic Bait", part: "BugTail", energy: 1, atk: 60, def: 80, info: "Apply stun when struck by Aquatic or Bird class cards. Can only trigger once per round." },
  { partId: "Gravel Ant", card: "Numbing Lecretion", part: "BugTail", energy: 1, atk: 30, def: 40, info: "Disable target's melee cards next round." },
  { partId: "Pupae", card: "Grub Explode", part: "BugTail", energy: 0, atk: 60, def: 0, info: "Deal 200% damage when attacking in Last stand. Axie's Last Stand ends after it attacks." },
  { partId: "Thorny Caterpillar", card: "Allergic Reaction", part: "BugTail", energy: 1, atk: 105, def: 30, info: "Deal 130% damage to debuffed targets." },
  // plant
  { partId: "Turnip", card: "Turnip Rocket", part: "PlantBack", energy: 1, atk: 60, def: 80, info: "Target a bird if comboed with 2 or more cards." },
  { partId: "Shiitake", card: "Shroom's Grace", part: "PlantBack", energy: 1, atk: 0, def: 40, hp: 120, info: "Heal this Axie for 120 HP." },
  { partId: "Bidens", card: "Cleanse Scent", part: "PlantBack", energy: 0, atk: 0, def: 50, info: "Remove all debuffs from this Axie." },
  { partId: "Watering Can", card: "Aqua Stock", part: "PlantBack", energy: 1, atk: 45, def: 80, info: "Gain 1 energy if this Axie is struck by an Aquatic card." },
  { partId: "Mint", card: "Refresh", part: "PlantBack", energy: 0, atk: 0, def: 50, info: "Remove all debuffs from a teammate if its directly in front (same row) of this Axie." },
  { partId: "Pumpkin", card: "October Treat", part: "PlantBack", energy: 0, atk: 0, def: 110, info: "Draw a card if this Axie's shield doesn't break this round." },
  { partId: "Bamboo Shoot", card: "Bamboo Clan", part: "PlantHorn", energy: 0, atk: 140, def: 0, info: "Increased 20% damage when chained with another plant card." },
  { partId: "Beech", card: "Wooden Stab", part: "PlantHorn", energy: 1, atk: 105, def: 40, info: "Deal 120% damage if this Axie's shield breaks." },
  { partId: "Rose Bud", card: "Healing Aroma", part: "PlantHorn", energy: 1, atk: 0, def: 40, hp: 120, info: "Heal this Axie for 120 HP." },
  {
    partId: "Strawberry Shortcake",
    card: "Sweet party",
    part: "PlantHorn",
    energy: 2,
    atk: 0,
    def: 0,
    hp: 270,
    info: "Heal front teammate for 270 HP. If there are no front teammates, heal this Axie instead.",
  },
  { partId: "Cactus", card: "Prickly Trap", part: "PlantHorn", energy: 1, atk: 110, def: 20, info: "Deal 120% damage if this Axie attacks last." },
  { partId: "Watermelon", card: "Seed Bullet", part: "PlantHorn", energy: 1, atk: 30, def: 50, info: "Target the fastest enemy." },
  { partId: "Serious", card: "Vegetal Bite", part: "PlantMouth", energy: 0, atk: 140, def: 0, info: "Steal 1 energy from your opponent when comboed with another card." },
  { partId: "Zigzag", card: "Drain Bite", part: "PlantMouth", energy: 1, atk: 60, def: 60, hp: 60, info: "Heal this Axie by the damage this card inflicts." },
  { partId: "Herbivore", card: "Vegan Diet", part: "PlantMouth", energy: 1, atk: 75, def: 75, hp: 75, info: "Heal this Axie by the damage this card inflicts on a Plant target." },
  { partId: "Silence Whisper", card: "Forest Spirit", part: "PlantMouth", energy: 1, atk: 0, def: 40, hp: 190, info: "Heal front teammate for 190 HP." },
  { partId: "Carrot", card: "Carrot Hammer", part: "PlantTail", energy: 1, atk: 70, def: 40, info: "Gain 1 energy if this Axie's shield breaks. Can only trigger once per round." },
  { partId: "Cattail", card: "Cattail Slap", part: "PlantTail", energy: 0, atk: 20, def: 30, info: "Draw a card if struck by a Beast, Bug, or Mech card." },
  { partId: "Hatsune", card: "Leek Leak", part: "PlantTail", energy: 1, atk: 60, def: 80, info: "When hit, disable the attacker's ranged cards next round." },
  { partId: "Yam", card: "Gas Unleash", part: "PlantTail", energy: 1, atk: 30, def: 20, info: "Apply poison each time this card is used to attack or defend." },
  { partId: "Potato Leaf", card: "Aqua Deflect", part: "PlantTail", energy: 1, atk: 90, def: 50, info: "Cannot be targeted by Aquatic cards if this Axie has teammates remaining." },
  { partId: "Hot Butt", card: "Spicy Surprise", part: "PlantTail", energy: 1, atk: 90, def: 50, info: "Disable target's mouth cards next round." },
  // Reptile
  { partId: "Bone Sail", card: "Ivory Chop", part: "ReptileBack", energy: 1, atk: 80, def: 80, info: "Draw a card if this Axie's shield breaks." },
  { partId: "Tri Spikes", card: "Spike Throw", part: "ReptileBack", energy: 1, atk: 80, def: 50, info: "Target enemy with lowest shield when comboed with 2 or more cards." },
  { partId: "Green Thorns", card: "Vine Dagger", part: "ReptileBack", energy: 0, atk: 20, def: 30, info: "Double shield from this card when comboed with a plant card." },
  { partId: "Indian Star", card: "Bulkwark", part: "ReptileBack", energy: 1, atk: 20, def: 80, info: "Reflect 40% of melee damage back at attacker." },
  { partId: "Red Ear", card: "Slippery Shield", part: "ReptileBack", energy: 1, atk: 10, def: 135, info: "Add 15% of this Axie's shield to adjacent teammates." },
  { partId: "Croc", card: "Nile Strike", part: "ReptileBack", energy: 1, atk: 90, def: 60, info: "Apply Speed- to target for 2 rounds." },
  { partId: "Unko", card: "Poo Fling", part: "ReptileHorn", energy: 1, atk: 30, def: 80, info: "Apply Stench to target until end of round." },
  { partId: "Scaly Spear", card: "Scaly Lunge", part: "ReptileHorn", energy: 1, atk: 100, def: 50, info: 'Deal 120% damage when chained with another "lunge" card.' },
  { partId: "Cerastes", card: "Surprise Invation", part: "ReptileHorn", energy: 1, atk: 90, def: 60, info: "Deal 130% damage if target is faster than this Axie." },
  { partId: "Scaly Spoon", card: "Tiny Catapult", part: "ReptileHorn", energy: 1, atk: 80, def: 40, info: "Reflect 50% of ranged damage back at attacker." },
  { partId: "Incisor", card: "Disarm", part: "ReptileHorn", energy: 1, atk: 100, def: 40, info: "Apply Speed- to attacker for 2 rounds." },
  { partId: "Bumpy", card: "Overgrow Keratin", part: "ReptileHorn", energy: 1, atk: 90, def: 30, info: "Recover 20 shield per turn." },
  { partId: "Toothless bite", card: "Sneaky Raid", part: "ReptileMouth", energy: 0, atk: 140, def: 0, info: "Target the furthest enemy." },
  { partId: "Kotaro", card: "Kotaro Bite", part: "ReptileMouth", energy: 1, atk: 80, def: 20, info: "Gain 1 energy if target is faster than this Axie." },
  { partId: "Razor Bite", card: "Why So Serious", part: "ReptileMouth", energy: 1, atk: 90, def: 50, info: "Heal this Axie by damage inflicted with this card to Aquatic targets." },
  { partId: "Tiny Turtle", card: "Chomp", part: "ReptileMouth", energy: 1, atk: 80, def: 50, info: "Apply Stun to enemy when comboed with at least 2 additional cards." },
  { partId: "Wall Gecko", card: "Critical Escape", part: "ReptileTail", energy: 0, atk: 140, def: 0, info: "Reduce damage taken by 15% this round." },
  { partId: "Iguana", card: "Scale Dart", part: "ReptileTail", energy: 1, atk: 90, def: 60, info: "Generate 1 energy when attacking a buffed target." },
  { partId: "Tiny Dino", card: "Tiny Swing", part: "ReptileTail", energy: 1, atk: 80, def: 40, info: "Deal 150% damage after round 4." },
  {
    partId: "Snake Jar",
    card: "Jar Barrage",
    part: "ReptileTail",
    energy: 1,
    atk: 80,
    def: 20,
    info: "Attacks that break this Axie’s shield cannot do additional damage. Can only trigger once per round.",
  },
  { partId: "Gila", card: "Neuro Toxin", part: "ReptileTail", energy: 1, atk: 100, def: 55, info: "Apply Attack- to poisoned targets." },
  { partId: "Grass Snake", card: "Venom Spray", part: "ReptileTail", energy: 0, atk: 10, def: 20, info: "Apply Poison to target." },
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    typography: {
      padding: theme.spacing(2),
    },
  })
);

const BreedSlider = withStyles({
  root: {
    color: "#ff8bbd",
    height: 5,
  },
  thumb: {
    height: 14,
    width: 14,
    backgroundColor: "#fff",
    border: "2px solid currentColor",

    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 5,
    borderRadius: 4,
  },
  rail: {
    height: 5,
    borderRadius: 4,
  },
})(Slider);

const SpeedSlider = withStyles({
  root: {
    color: "#f7ab09",
    height: 5,
  },
  thumb: {
    height: 14,
    width: 14,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -5,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 5,
    borderRadius: 4,
  },
  rail: {
    height: 5,
    borderRadius: 4,
  },
})(Slider);

const HealthSlider = withStyles({
  root: {
    color: "#3ac278",
    height: 5,
  },
  thumb: {
    height: 14,
    width: 14,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -5,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 5,
    borderRadius: 4,
  },
  rail: {
    height: 5,
    borderRadius: 4,
  },
})(Slider);

const SkillSlider = withStyles({
  root: {
    color: "#6a3ac2",
    height: 5,
  },
  thumb: {
    height: 14,
    width: 14,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -5,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 5,
    borderRadius: 4,
  },
  rail: {
    height: 5,
    borderRadius: 4,
  },
})(Slider);

const MoraleSlider = withStyles({
  root: {
    color: "#c23b3a",
    height: 5,
  },
  thumb: {
    height: 14,
    width: 14,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -5,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 5,
    borderRadius: 4,
  },
  rail: {
    height: 5,
    borderRadius: 4,
  },
})(Slider);
