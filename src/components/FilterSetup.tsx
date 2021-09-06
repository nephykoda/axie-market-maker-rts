import { FunctionComponent, useContext, useEffect, useState } from "react";
import React from "react";
import {
  createStyles,
  Theme,
  withStyles,
  makeStyles,
  createTheme,
} from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import "./FilterSetup.css";
import { FiltersContext } from "../store/filters-context";
import AxieFilters from "../model/filters";
import Popover from "@material-ui/core/Popover";
import SaveIcon from "@material-ui/icons/Save";

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

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const [parts, setParts] = useState<[]>([]);
  const [breed, setBreed] = useState<[number, number]>([0, 7]);
  const [health, setHealth] = useState<[number, number]>([27, 61]);
  const [speed, setSpeed] = useState<[number, number]>([27, 61]);
  const [skill, setSkill] = useState<[number, number]>([27, 61]);
  const [morale, setMorale] = useState<[number, number]>([27, 61]);
  const [name, setName] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [checkbox, setCheckbox] = useState(false);

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
    setParts(newValue);
  };
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBtnDisabled(!event.target.value);
    setName(event.target.value);
  };
  const handleCreateFilter = (e: React.MouseEvent<HTMLButtonElement>) => {
    //filter Classes
    const asArray = Object.entries(classesCheckbox);
    // console.log(asArray);
    const filtered = asArray.filter(([key, value]) => value === true);
    // console.log(filtered);
    const filteredClasses: any = [];
    filtered.forEach((element) => {
      filteredClasses.push(element[0].slice(7));
    });
    const newFilter = new AxieFilters(
      name,
      filteredClasses,
      parts,
      breed,
      health,
      speed,
      skill,
      morale
    );
    filtersCtx.addAxieFilters(newFilter);
    // console.log(newFilter);
    resetFilters();
    handleClick(e);
    setBtnDisabled(true);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setTimeout(() => handleClose(), 1500);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const axieStats: any[] = [
    {
      name: "Breed",
      value: breed,
      set: setBreed,
      handler: handleBreedChange,
      min: 0,
      max: 7,
    },
    {
      name: "Health",
      value: health,
      set: setHealth,
      handler: handleHealthChange,
      min: 27,
      max: 61,
    },
    {
      name: "Speed",
      value: speed,
      set: setSpeed,
      handler: handleSpeedChange,
      min: 27,
      max: 61,
    },
    {
      name: "Skill",
      value: skill,
      set: setSkill,
      handler: handleSkillChange,
      min: 27,
      max: 61,
    },
    {
      name: "Morale",
      value: morale,
      set: setMorale,
      handler: handleMoraleChange,
      min: 27,
      max: 61,
    },
  ];

  //   useEffect(() => {
  //     console.log(classesCheckbox);
  //   }, [classesCheckbox]);
  //   useEffect(() => {
  //     console.log(parts);
  //   }, [parts]);
  //   useEffect(() => {
  //     console.log(name);
  //   }, [name]);

  return (
    <div>
      <div className="wrapping-container" style={{ marginBottom: 10 }}>
        <div style={{ marginBottom: 15 }}>
          Body Parts & Cards
          <Autocomplete
            onChange={(event, value) => handlePartChange(event, value)}
            multiple
            value={parts}
            id="tags-standard"
            options={axieParts}
            getOptionLabel={(option) => {
              return `${option.part} || ${option.card}`;
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Select body parts / card abilities"
              />
            )}
          />
        </div>
        Class
        <FormGroup row>
          {axieClasses.map((axieClass) => {
            let checkAxieClass = "checked" + axieClass;
            return (
              <FormControlLabel
                control={
                  <Checkbox
                    key={axieClass}
                    size="small"
                    onChange={(e) => handleClassChange(axieClass, e)}
                    name={axieClass}
                    color="primary"
                    checked={classesCheckbox[checkAxieClass]}
                  />
                }
                label={axieClass}
              />
            );
          })}
        </FormGroup>
        <div style={{ marginTop: 20 }}>
          {axieStats.map((axieStat) => {
            return (
              <Grid container spacing={5}>
                <Grid item xs={2}>
                  <div className="text">{axieStat.name}</div>
                </Grid>
                <Grid item xs>
                  <div className="label">{axieStat.value[0]}</div>
                </Grid>
                <Grid item xs={7}>
                  <Slider
                    value={axieStat.value}
                    onChange={axieStat.handler}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    getAriaValueText={statValueText}
                    max={axieStat.max}
                    min={axieStat.min}
                  />
                </Grid>
                <Grid item xs>
                  <div className="label">{axieStat.value[1]}</div>
                </Grid>
              </Grid>
            );
          })}
        </div>
      </div>
      <Grid container>
        <Grid item xs={8}>
          <TextField
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleNameChange(event)
            }
            size="small"
            id="outlined-basic"
            label="Preset Filter Name"
            variant="outlined"
            value={name}
            fullWidth={true}
          />
        </Grid>
        <Grid item xs={1}>
          <div></div>
        </Grid>
        <Grid item xs>
          <Button
            aria-describedby={id}
            onClick={(e) => handleCreateFilter(e)}
            disabled={btnDisabled}
            color="primary"
            variant="contained"
            startIcon={<SaveIcon />}
          >
            Save
          </Button>
          <Popover
            style={{ marginRight: 50 }}
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
              horizontal: "center",
            }}
          >
            <Typography style={{ padding: 10 }}>
              <div>Preset Created 🎉</div>
              <div style={{ fontSize: 12 }}>Check Market Filter Tab!</div>
            </Typography>
          </Popover>
        </Grid>
      </Grid>
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

function breedValueText(value: any) {
  return `${value}`;
}
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

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   paper: {
//     padding: theme.spacing(2),
//     textAlign: "center",
//     color: theme.palette.text.secondary,
//   },
// }));

const axieParts = [
  // aqua
  { part: "Hermit", card: "Shelter" },
  { part: "Blue Moon", card: "Scale Dart" },
  { part: "Goldfish", card: "Swift Escape" },
  { part: "Sponge", card: "Shipwreck" },
  { part: "Anemone", card: "Aqua Vitality" },
  { part: "Anemone", card: "Aquaponics" },
  { part: "Perch", card: "Spinal Trap" },
  { part: "Babylonia", card: "Shell Jab" },
  { part: "Teal Shell", card: "Deep Sea Gore" },
  { part: "Clamshell", card: "Clam Slash" },
  { part: "Oranda", card: "Hero's Bane" },
  { part: "Shoal Star", card: "Star Shuriken" },
  { part: "Lam", card: "Angry Lam" },
  { part: "Catfish", card: "Swallow" },
  { part: "Risky Fish", card: "Fish Hook" },
  { part: "Piranha", card: "Crimson Water" },
  { part: "Koi", card: "Upstream Swim" },
  { part: "Nimo", card: "Tail Slap" },
  { part: "Tadpole", card: "Ranchu" },
  { part: "Navaga", card: "Flanking Smack" },
  { part: "Shrimp", card: "Chitin Jump" },
  // beast
  { part: "Ronin", card: "Single Combat" },
  { part: "Hero", card: "Heroic Reward" },
  { part: "Jaguar", card: "Nitro Leap" },
  { part: "Risky Beast", card: "Revenge Arrow" },
  { part: "Timber", card: "Woodman Power" },
  { part: "Furball", card: "Juggling Balls" },
  { part: "Little Branch", card: "Branch Charge" },
  { part: "Imp", card: "Ivory Stab" },
  { part: "Merry", card: "Merry Legion" },
  { part: "Pocky", card: "Sugar Rush" },
  { part: "Dual Blade", card: "Sinister Strike" },
  { part: "Arco", card: "Acrobatics" },
  { part: "Nut Cracker", card: "Nut Crack" },
  { part: "Goda", card: "Piercing Sound" },
  { part: "Axie Kiss", card: "Death Mark" },
  { part: "Confident", card: "Self Rally" },
  { part: "Cottontail", card: "Luna Absorb" },
  { part: "Rice", card: "Night Steal" },
  { part: "Shiba", card: "Rampant Howl" },
  { part: "Hare", card: "Hare Dagger" },
  { part: "Nut Cracker", card: "Nut Throw" },
  { part: "Gerbil", card: "Gerbil Jump" },
  // bird
  { part: "Balloon", card: "Balloon Pop" },
  { part: "Cupid", card: "Heart Break" },
  { part: "Raven", card: "Ill-omened" },
  { part: "Pigeon Post", card: "Blackmail" },
  { part: "Kingfisher", card: "Patient hunter" },
  { part: "Tri Feather", card: "Triple Threat" },
  { part: "Eggshell", card: "Eggbomb" },
  { part: "Cuckoo", card: "Cockadoodledoo" },
  { part: "Trump", card: "Air Force One" },
  { part: "Kestrel", card: "Headshot" },
  { part: "Wing Horn", card: "Smart Shot" },
  { part: "Feather Spear", card: "Feather Lunge" },
  { part: "Doubletalk", card: "Soothing Song" },
  { part: "Peace maker", card: "Peace Traety" },
  { part: "Hungry Bird", card: "Insectivore" },
  { part: "Little Owl", card: "Dark Swoop" },
  { part: "Swallow", card: "Early Bird" },
  { part: "Feather Fan", card: "Sunder Armor" },
  { part: "The Last One", card: "Risky Fether" },
  { part: "Cloud", card: "Puffy Smack" },
  { part: "Granma's Fan", card: "Cool Breeze" },
  { part: "Post Fight", card: "All-out Shot" },
  // bug
  { part: "Snail Shell", card: "Sticky Goo" },
  { part: "Garish Worm", card: "Barb Strike" },
  { part: "Buzz Buzz", card: "Bug Noise" },
  { part: "Sandal", card: "Bug Splat" },
  { part: "Scarab", card: "Scarab Curse" },
  { part: "Spiky Wing", card: "Buzzing Wind" },
  { part: "Lagging", card: "Mystic Rush" },
  { part: "Antenna", card: "Bug Signal" },
  { part: "Caterpillars", card: "Grab Surprise" },
  { part: "Pliers", card: "Dull Grip" },
  { part: "Parasite", card: "Third Glance" },
  { part: "Leaf Bug", card: "Disguise" },
  { part: "Mosquito", card: "Blood Taste" },
  { part: "Pincer", card: "Sunder Claw" },
  { part: "Cute Bunny", card: "Terror Chomp" },
  { part: "Square Teeth", card: "Mite Bite" },
  { part: "Ant", card: "Chemical Warfare" },
  { part: "Twin Tail", card: "Twin Needle" },
  { part: "Fish Snack", card: "Anesthetic Bait" },
  { part: "Gravel Ant", card: "Numbing Lecretion" },
  { part: "Pupae", card: "Grub Explode" },
  { part: "Thorny Caterpillar", card: "Allergic Reaction" },
  // plant
  { part: "Turnip", card: "Turnip Rocket" },
  { part: "Shiitake", card: "Shroom's Grace" },
  { part: "Bidens", card: "Cleanse Scent" },
  { part: "Watering Can", card: "Aqua Stock" },
  { part: "Mint", card: "Refresh" },
  { part: "Pumpkin", card: "October Treat" },
  { part: "Bamboo Shoot", card: "Bamboo Clan" },
  { part: "Beech", card: "Wooden Stab" },
  { part: "Rose Bud", card: "Healing Aroma" },
  { part: "Strawberry Shortcake", card: "Sweet Party" },
  { part: "Cactus", card: "Prickly Trap" },
  { part: "Watermelon", card: "Seed Bullet" },
  { part: "Serious", card: "Vegetal Bite" },
  { part: "Zigzag", card: "Drain Bite" },
  { part: "Herbivore", card: "Vegan Diet" },
  { part: "Silence Whisper", card: "Forest Spirit" },
  { part: "Carrot", card: "Carrot Hammer" },
  { part: "Cattail", card: "Cattail Slap" },
  { part: "Hatsune", card: "Leek Leak" },
  { part: "Yam ", card: "Gas Unleash" },
  { part: "Potato Leaf", card: "Hot Butt" },
  // Reptile
  { part: "Bone Sail", card: "Ivory Chop" },
  { part: "Tri Spikes", card: "Spike Throw" },
  { part: "Green Thorns", card: "Vine Dagger" },
  { part: "Indian Star", card: "Bulkwark" },
  { part: "Red Ear", card: "Slippery Shield" },
  { part: "Croc", card: "Nile Strike" },
  { part: "Unko", card: "Poo Fling" },
  { part: "Scaly Spear", card: "Scaly Lunge" },
  { part: "Cerastes", card: "Surprise Invation" },
  { part: "Scaly Spoon", card: "Tiny Catapult" },
  { part: "Incisor", card: "Disarm" },
  { part: "Bumpy", card: "Overgrow Keratin" },
  { part: "Toothless bite", card: "Sneaky Raid" },
  { part: "Kotaro", card: "Kotaro Bite" },
  { part: "Razor Bite", card: "Why So Serious" },
  { part: "Tiny Turtle", card: "Chomp" },
  { part: "Wall Gecko", card: "Critical Escape" },
  { part: "Iguana", card: "Scale Dart" },
  { part: "Tiny Dino", card: "Tiny Swing" },
  { part: "Snake Jar", card: "Jar Barrage" },
  { part: "Gila", card: "Neuro Toxin" },
  { part: "Grass Snake", card: "Venom Spray" },
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    typography: {
      padding: theme.spacing(2),
    },
  })
);
