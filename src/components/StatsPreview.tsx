import * as React from "react";
import { Component, FunctionComponent } from "react";
import Grid from "@material-ui/core/Grid";
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
import { AxieParts } from "../components/FilterSetup";
import "./BodyPart.css";

interface StatsPreviewProps {
  stat: string;
  min: string | number | AxieParts | undefined;
  max: string | number | AxieParts | undefined;
}

const StatsPreview: FunctionComponent<StatsPreviewProps> = (props) => {
  let statIcon;
  switch (props.stat) {
    case "Breed":
      statIcon = Breed1;
      break;
    case "Health":
      statIcon = Health1;
      break;
    case "Speed":
      statIcon = Speed1;
      break;
    case "Skill":
      statIcon = Skill1;
      break;
    case "Morale":
      statIcon = Morale1;
      break;
  }

  //   console.log("MIN");
  //   console.log(props.min);
  //   console.log("MAX");
  //   console.log(props.max);
  let maxVal =
    props.max === undefined ? undefined : (
      <Grid item>
        <Grid alignItems="center" container direction="column">
          <Grid className="regular" style={{ fontSize: 8 }} item>
            MAX
          </Grid>
          <Grid className="bold" style={{ marginTop: -3 }} item>
            {props.max}
          </Grid>
        </Grid>
      </Grid>
    );
  let minVal =
    props.min === undefined ? undefined : (
      <Grid item>
        <Grid alignItems="center" container direction="column">
          <Grid className="regular" style={{ fontSize: 8 }} item>
            MIN
          </Grid>
          <Grid className="bold" style={{ marginTop: -3 }} item>
            {props.min}
          </Grid>
        </Grid>
      </Grid>
    );

  return (
    <Grid xs container alignItems="center" justifyContent="space-between" style={{ color: "black", backgroundColor: "white", borderRadius: 5, paddingRight: 5, paddingLeft: 5, paddingBottom: 4 }}>
      <Grid>
        <img style={{ marginBottom: -7, height: 20 }} src={statIcon} alt="" />
        {/* <img style={{ marginTop: 5, marginBottom: 0, height: 20 }} src={statIcon} alt="" /> */}
      </Grid>
      {minVal}
      {maxVal}
    </Grid>
  );
};

export default StatsPreview;
