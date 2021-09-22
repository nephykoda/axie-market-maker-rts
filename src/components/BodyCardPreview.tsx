import * as React from "react";
import { Component, FunctionComponent } from "react";
import Grid from "@material-ui/core/Grid";
import "./BodyPart.css";
import { AxieParts } from "../components/FilterSetup";
import { classFinder, classColor } from "./BodyPart";
import Back from "../images/body/Back.svg";
import Horn from "../images/body/Horn.svg";
import Mouth from "../images/body/Mouth.svg";
import Tail from "../images/body/Tail.svg";

interface BodyCardPreviewProps {
  bodyCard: any;
}

const BodyCardPreview: FunctionComponent<BodyCardPreviewProps> = (props) => {
  let bodyCardInfo = { ...props.bodyCard[1] };
  console.log(bodyCardInfo);
  let axieClass: any = classFinder(bodyCardInfo.part);
  let imgIcon = bodyPartImgFromClassPart(bodyCardInfo.part);
  let bgColor = classColor(axieClass);
  return (
    <Grid
      container
      className="bold"
      alignItems="center"
      style={{
        // display: "flex",
        // alignItems: "center",
        marginBottom: 2.5,
        marginTop: 2.5,
        paddingTop: 2,
        paddingBottom: 0,
        paddingLeft: 10,
        paddingRight: 5,
        color: "white",
        backgroundColor: bgColor,
        borderRadius: 5,
        border: 1,
      }}
    >
      <Grid item justifyContent="center">
        <img style={{ width: 22, paddingRight: 5 }} src={imgIcon} alt="" />
      </Grid>
      <Grid item>
        <div style={{ height: 30, paddingRight: 3, display: "flex", flexDirection: "column" }}>
          <div className="black" style={{ marginBottom: 2, fontSize: 10, height: 10 }}>
            {bodyCardInfo.partId}
          </div>
          <div className="bold" style={{ fontSize: 8 }}>
            {bodyCardInfo.card}
          </div>
        </div>
      </Grid>
    </Grid>
  );
};
export default BodyCardPreview;

const bodyPartImgFromClassPart = (_partId: string) => {
  switch (classFinder(_partId)) {
    case "Aqua":
      return bodyPartImg(_partId.slice(4));
    case "Beast":
      return bodyPartImg(_partId.slice(5));
    case "Bird":
      return bodyPartImg(_partId.slice(4));
    case "Bug":
      return bodyPartImg(_partId.slice(3));
    case "Plant":
      return bodyPartImg(_partId.slice(5));
    case "Reptile":
      return bodyPartImg(_partId.slice(7));
  }
};

export const bodyPartImg = (_part: string) => {
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
