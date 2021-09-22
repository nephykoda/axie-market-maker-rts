import { Component, FunctionComponent, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { colors, IconButton } from "@material-ui/core";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";

//#region import SVG
import AquaBack from "../images/body/AquaBack.svg";
import AquaHorn from "../images/body/AquaHorn.svg";
import AquaMouth from "../images/body/AquaMouth.svg";
import AquaTail from "../images/body/AquaTail.svg";
import BeastBack from "../images/body/BeastBack.svg";
import BeastHorn from "../images/body/BeastHorn.svg";
import BeastMouth from "../images/body/BeastMouth.svg";
import BeastTail from "../images/body/BeastTail.svg";
import BirdBack from "../images/body/BirdBack.svg";
import BirdHorn from "../images/body/BirdHorn.svg";
import BirdMouth from "../images/body/BirdMouth.svg";
import BirdTail from "../images/body/BirdTail.svg";
import BugBack from "../images/body/BugBack.svg";
import BugHorn from "../images/body/BugHorn.svg";
import BugMouth from "../images/body/BugMouth.svg";
import BugTail from "../images/body/BugTail.svg";
import PlantBack from "../images/body/PlantBack.svg";
import PlantHorn from "../images/body/PlantHorn.svg";
import PlantMouth from "../images/body/PlantMouth.svg";
import PlantTail from "../images/body/PlantTail.svg";
import ReptileBack from "../images/body/ReptileBack.svg";
import ReptileHorn from "../images/body/ReptileHorn.svg";
import ReptileMouth from "../images/body/ReptileMouth.svg";
import ReptileTail from "../images/body/ReptileTail.svg";
import Back from "../images/body/Back.svg";
import Horn from "../images/body/Horn.svg";
import Mouth from "../images/body/Mouth.svg";
import Tail from "../images/body/Tail.svg";
//#endregion

import atk from "../images/cards/atk.png";
import def from "../images/cards/def.png";
import nrg from "../images/cards/nrg.png";
import "./BodyPart.css";

interface BodyPartProps {
  partId: string;
  card: string;
  classification: string;
  energy: number;
  atk: number;
  def: number;
  info: string;
}

interface SelectedLabelProps {
  partId: string;
  card: string;
  classification: string;
  onDelete: () => void;
}

const bodyPartImg = (_part: string) => {
  switch (_part) {
    case "AquaBack":
      return AquaBack;
    case "AquaHorn":
      return AquaHorn;
    case "AquaMouth":
      return AquaMouth;
    case "AquaTail":
      return AquaTail;
    case "BeastBack":
      return BeastBack;
    case "BeastHorn":
      return BeastHorn;
    case "BeastMouth":
      return BeastMouth;
    case "BeastTail":
      return BeastTail;
    case "BirdBack":
      return BirdBack;
    case "BirdHorn":
      return BirdHorn;
    case "BirdMouth":
      return BirdMouth;
    case "BirdTail":
      return BirdTail;
    case "BugBack":
      return BugBack;
    case "BugHorn":
      return BugHorn;
    case "BugMouth":
      return BugMouth;
    case "BugTail":
      return BugTail;
    case "PlantBack":
      return PlantBack;
    case "PlantHorn":
      return PlantHorn;
    case "PlantMouth":
      return PlantMouth;
    case "PlantTail":
      return PlantTail;
    case "ReptileBack":
      return ReptileBack;
    case "ReptileHorn":
      return ReptileHorn;
    case "ReptileMouth":
      return ReptileMouth;
    case "ReptileTail":
      return ReptileTail;
  }
};

export const classFinder = (_partId: string) => {
  if (_partId.slice(0, 4) === "Aqua") {
    return "Aqua";
  } else if (_partId.slice(0, 5) === "Beast") {
    return "Beast";
  } else if (_partId.slice(0, 4) === "Bird") {
    return "Bird";
  } else if (_partId.slice(0, 3) === "Bug") {
    return "Bug";
  } else if (_partId.slice(0, 5) === "Plant") {
    return "Plant";
  } else if (_partId.slice(0, 7) === "Reptile") {
    return "Reptile";
  }
};

const classDarkColor = (_partId: string) => {
  switch (classFinder(_partId)) {
    case "Aqua":
      return "#1a2932";
    case "Beast":
      return "#32271a";
    case "Bird":
      return "#381f26";
    case "Bug":
      return "#361e1e";
    case "Plant":
      return "#262c1a";
    case "Reptile":
      return "#271c2c";
  }
};

const bodyPartImgTransparent = (_partId: string) => {
  switch (classFinder(_partId)) {
    case "Aqua":
      return transparentpartImg(_partId.slice(4));
    case "Beast":
      return transparentpartImg(_partId.slice(5));
    case "Bird":
      return transparentpartImg(_partId.slice(4));
    case "Bug":
      return transparentpartImg(_partId.slice(3));
    case "Plant":
      return transparentpartImg(_partId.slice(5));
    case "Reptile":
      return transparentpartImg(_partId.slice(7));
  }
};

const transparentpartImg = (_part: string) => {
  switch (_part) {
    case "Back":
      return Back;
    case "Horn":
      return Horn;
    case "Mouth":
      return Mouth;
    case "Tail":
      return Tail;
  }
};

const classShadeColor = (_partId: string) => {
  switch (classFinder(_partId)) {
    case "Aqua":
      // colorHex = "#00b7ce";
      return "#0a8497";
    case "Beast":
      // colorHex = "#ffb813";
      return "#c38e18";
    case "Bird":
      // colorHex = "#ff8bbd";
      return "#b8668a";
    case "Bug":
      // colorHex = "#ff5242";
      return "#9d332a";
    case "Plant":
      // colorHex = "#6bc001";
      return "#4d8d0c";
    case "Reptile":
      // colorHex = "#dd8be4";
      return "#9d63a4";
  }
};
export const classColor = (_partId: string) => {
  switch (classFinder(_partId)) {
    case "Aqua":
      // colorHex = "#00b7ce";
      return "#00b7ce";
    case "Beast":
      // colorHex = "#ffb813";
      return "#ffb813";
    case "Bird":
      // colorHex = "#ff8bbd";
      return "#ff8bbd";
    case "Bug":
      // colorHex = "#ff5242";
      return "#ff5242";
    case "Plant":
      // colorHex = "#6bc001";
      return "#6bc001";
    case "Reptile":
      // colorHex = "#dd8be4";
      return "#dd8be4";
  }
};

export const SelectedLabel: FunctionComponent<SelectedLabelProps> = (props) => {
  let bgColor = classShadeColor(props.classification);
  let bodyImg = bodyPartImgTransparent(props.classification);

  return (
    <div
      className="bold"
      style={{
        display: "flex",
        alignItems: "center",
        fontSize: 13,
        marginBottom: 2.5,
        marginTop: 2.5,
        paddingLeft: 10,
        paddingRight: 5,
        color: "white",
        backgroundColor: bgColor,
        borderRadius: 20,
        border: 1,
      }}
    >
      <img style={{ width: 22, paddingRight: 5 }} src={bodyImg} alt="" />
      <div style={{ height: 30, paddingRight: 3, display: "flex", flexDirection: "column" }}>
        <div className="bold" style={{ marginBottom: 2, fontSize: 12, height: 10 }}>
          {props.partId}
        </div>
        <div className="regular" style={{ fontSize: 10 }}>
          {props.card}
        </div>
      </div>
      <IconButton style={{ padding: 0, margin: 0 }} onClick={props.onDelete}>
        <CancelRoundedIcon style={{ width: 15 }} />
      </IconButton>
    </div>
  );
};

export const BodyPart: FunctionComponent<BodyPartProps> = (props) => {
  let bodyImg = bodyPartImg(props.classification);
  let infoColorBg = classDarkColor(props.classification);
  let divName = classFinder(props.classification!);

  return (
    <>
      <div
        className={divName}
        style={{
          margin: 5,
          padding: 10,
          backgroundColor: colors.grey[800],
          width: "100%",
          borderRadius: 10,
        }}
      >
        <Grid container>
          <Grid>
            <Grid container direction="column" justifyContent="center" style={{ height: "100%" }}>
              <Grid item>
                <div style={{ height: 2 }}></div>
              </Grid>
              <img style={{ height: 30 }} src={bodyImg} alt="" />
            </Grid>
          </Grid>
          <Grid item xs={4} style={{ padding: 3, paddingLeft: 10 }}>
            <Grid container direction="column" justifyContent="center" style={{ height: "100%" }}>
              <Grid item className="bold" style={{ fontSize: 13, color: "white" }}>
                {props.partId}
              </Grid>
              <Grid item className="regular" style={{ fontSize: 9, color: colors.grey[400] }}>
                {props.card}
              </Grid>
            </Grid>
          </Grid>
          <Grid className="gillsans" item xs={2}>
            <Grid container direction="column" justifyContent="center" alignItems="center" style={{ height: "100%", width: 50 }}>
              <Grid
                item
                style={{
                  width: "100%",
                  fontSize: 13,
                  color: "#fbce11",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    backgroundColor: colors.grey[900],
                    borderTopLeftRadius: 5,
                    borderTopRightRadius: 5,
                  }}
                >
                  <Grid>
                    <img style={{ marginLeft: 8, height: 10 }} src={nrg} alt="" />
                  </Grid>
                  <Grid className="" style={{ marginRight: 5 }}>
                    {props.energy}
                  </Grid>
                </div>
              </Grid>
              <Grid
                item
                style={{
                  width: "100%",
                  fontSize: 13,
                  color: "#d04664",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: "100%",
                    justifyContent: "space-between",
                    backgroundColor: colors.grey[900],
                    display: "flex",
                  }}
                >
                  <Grid>
                    <img style={{ marginLeft: 8, height: 10 }} src={atk} alt="" />{" "}
                  </Grid>
                  <Grid style={{ marginRight: 5 }}>{props.atk}</Grid>
                </div>
              </Grid>
              <Grid
                item
                style={{
                  width: "100%",
                  fontSize: 13,
                  color: "#009e66",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    backgroundColor: colors.grey[900],
                    borderBottomLeftRadius: 5,
                    borderBottomRightRadius: 5,
                  }}
                >
                  <Grid>
                    <img style={{ marginLeft: 8, height: 10 }} src={def} alt="" />{" "}
                  </Grid>
                  <Grid style={{ marginRight: 5 }}>{props.def}</Grid>
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            xs
            justifyContent="center"
            alignItems="center"
            style={{
              borderRadius: 5,
              width: "auto",
              backgroundColor: infoColorBg,
              textAlign: "center",
              fontSize: 10,
              color: "white",
              padding: 6,
            }}
          >
            <Grid item className="bold">
              {props.info}
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
};
