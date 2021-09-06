import { DOMMessage, DOMMessageResponse, DOMFilterBuild } from "../types";
import AxieFilters from "../model/filters";
import { AssertsThisTypePredicate } from "typescript";

const messagesFromReactAppListener = (
  msg: DOMMessage | DOMFilterBuild,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response: DOMMessageResponse) => void
) => {
  console.log("[content.js]. Message received", msg);
  (
    document.getElementsByClassName(
      "text-primary-4 hover:text-primary-3 transition hover:cursor-pointer"
    )[0] as HTMLElement
  ).click();

  if (msg.type === "FILTER_BUILD") {
    var filterBuildObj: AxieFilters | any = msg.filterConditions;

    // ======= GENERAL TAB =======

    // var clearFilter = document.getElementsByClassName(
    //   "text-primary-4 hover:text-primary-3 transition hover:cursor-pointer"
    // )[0] as HTMLElement;
    // clearFilter.click();
    (
      document.getElementsByClassName(
        "text-primary-4 hover:text-primary-3 transition hover:cursor-pointer"
      )[0] as HTMLElement
    ).click();

    (
      (document.getElementsByClassName(
        "tab px-32 py-12 text-20 text-center font-bold mr-8"
      )
        ? document.getElementsByClassName(
            "tab px-32 py-12 text-20 text-center font-bold mr-8"
          )
        : document.getElementsByClassName(
            "tab px-32 py-12 text-20 text-center font-bold mr-8 transition-bg hover:bg-gray-4 cursor-pointer"
          ))[0] as HTMLElement
    ).click();

    filterBuildObj.classes.forEach((axieClass: string) => {
      filterClass(axieClass);
    });

    var breedLeft = document.getElementsByClassName(
      "w-12 h-12 rounded-full border-solid border-gray-2 border bg-gray-1"
    )[0];
    var breedRight = document.getElementsByClassName(
      "w-12 h-12 rounded-full border-solid border-gray-2 border bg-gray-1"
    )[1];

    filterDoubleSlider(breedLeft, breedRight, "General", filterBuildObj.breed);

    // ======= BODY PARTS TAB =======
    (
      (document.getElementsByClassName(
        "tab px-32 py-12 text-20 text-center font-bold mr-8"
      )
        ? document.getElementsByClassName(
            "tab px-32 py-12 text-20 text-center font-bold mr-8"
          )
        : document.getElementsByClassName(
            "tab px-32 py-12 text-20 text-center font-bold mr-8 transition-bg hover:bg-gray-4 cursor-pointer"
          ))[1] as HTMLElement
    ).click();
  }

  (
    document.getElementsByClassName(
      "px-12 py-8 w-full border transition text-14 input-field border-gray-3 focus:border-primary-4 bg-gray-6 text-white placeholder-gray-2"
    )[0] as HTMLElement
  ).focus();

  for (
    let i = 0;
    i < document.getElementsByClassName("text-white font-bold").length;
    i++
  ) {
    filterBuildObj.parts.forEach((part: any) => {
      if (
        part.card ===
          document.getElementsByClassName("text-white font-bold")[i].nextSibling
            ?.textContent &&
        part.part ===
          document.getElementsByClassName("text-white font-bold")[i].textContent
      ) {
        (
          document.getElementsByClassName("text-white font-bold")[
            i
          ] as HTMLElement
        ).click();
      }
    });

    (
      document.getElementsByClassName(
        "px-12 py-8 w-full border transition text-14 input-field border-gray-3 focus:border-primary-4 bg-gray-6 text-white placeholder-gray-2"
      )[0] as HTMLElement
    ).focus();
  }
  // ======= STATS TAB =======
  (
    (document.getElementsByClassName(
      "tab px-32 py-12 text-20 text-center font-bold mr-8"
    )
      ? document.getElementsByClassName(
          "tab px-32 py-12 text-20 text-center font-bold mr-8"
        )
      : document.getElementsByClassName(
          "tab px-32 py-12 text-20 text-center font-bold mr-8 transition-bg hover:bg-gray-4 cursor-pointer"
        ))[2] as HTMLElement
  ).click();

  var healthLeft = document.getElementsByClassName(
    "w-12 h-12 rounded-full border-solid border-gray-2 border bg-gray-1"
  )[0];
  var healthRight = document.getElementsByClassName(
    "w-12 h-12 rounded-full border-solid border-gray-2 border bg-gray-1"
  )[1];
  var speedLeft = document.getElementsByClassName(
    "w-12 h-12 rounded-full border-solid border-gray-2 border bg-gray-1"
  )[2];
  var speedRight = document.getElementsByClassName(
    "w-12 h-12 rounded-full border-solid border-gray-2 border bg-gray-1"
  )[3];
  var skillLeft = document.getElementsByClassName(
    "w-12 h-12 rounded-full border-solid border-gray-2 border bg-gray-1"
  )[4];
  var skillRight = document.getElementsByClassName(
    "w-12 h-12 rounded-full border-solid border-gray-2 border bg-gray-1"
  )[5];
  var moraleLeft = document.getElementsByClassName(
    "w-12 h-12 rounded-full border-solid border-gray-2 border bg-gray-1"
  )[6];
  var moraleRight = document.getElementsByClassName(
    "w-12 h-12 rounded-full border-solid border-gray-2 border bg-gray-1"
  )[7];

  filterDoubleSlider(healthLeft, healthRight, "Stats", filterBuildObj.health);

  filterDoubleSlider(speedLeft, speedRight, "Stats", filterBuildObj.speed);
  filterDoubleSlider(skillLeft, skillRight, "Stats", filterBuildObj.skill);
  filterDoubleSlider(moraleLeft, moraleRight, "Stats", filterBuildObj.morale);

  (
    (document.getElementsByClassName(
      "tab px-32 py-12 text-20 text-center font-bold mr-8"
    )
      ? document.getElementsByClassName(
          "tab px-32 py-12 text-20 text-center font-bold mr-8"
        )
      : document.getElementsByClassName(
          "tab px-32 py-12 text-20 text-center font-bold mr-8 transition-bg hover:bg-gray-4 cursor-pointer"
        ))[0] as HTMLElement
  ).click();
};
function filterDoubleSlider(left: any, right: any, tab: string, minMax: any) {
  let Lpos = left.getBoundingClientRect(),
    Rpos = right.getBoundingClientRect();
  sliderDragger(left, Lpos, right, Rpos, true, tab, minMax[0]); // true : Left To Right
  sliderDragger(right, Rpos, left, Lpos, false, tab, minMax[1]); // false : Right To Left
}

var sliderDragger = function (
  selectorDrag: any,
  dragPos: any,
  selectorDrop: any,
  dropPos: any,
  leftToRight: boolean,
  slider: any,
  val: any
) {
  // function for triggering mouse events
  var fireMouseEvent = function (
    type: any,
    elem: any,
    centerX: any,
    centerY: any
  ) {
    var evt = document.createEvent("MouseEvents");
    evt.initMouseEvent(
      type,
      true,
      true,
      window,
      1,
      1,
      1,
      centerX,
      centerY,
      false,
      false,
      false,
      false,
      0,
      elem
    );
    elem.dispatchEvent(evt);
  };

  // fetch target elements
  var elemDrag = selectorDrag;
  var elemDrop = selectorDrop;
  if (!elemDrag || !elemDrop) return false;

  // calculate positions
  // var pos = elemDrag.getBoundingClientRect();
  var center1X = leftToRight
    ? dragPos.left
    : Math.floor((dragPos.left + dragPos.right) / 2);
  var center1Y = Math.floor((dragPos.top + dragPos.bottom) / 2);
  // pos = elemDrop.getBoundingClientRect();
  var center2X;
  if (slider === "General") {
    center2X = leftToRight
      ? (((dropPos.left + dropPos.right) / 2 - center1X) / 7) * val + 10
      : center1X -
        ((center1X - (dropPos.left + dropPos.right) / 2) / 7) *
          Math.abs(val - 7);
  } else if (slider === "Stats") {
    let offsetA = val > 50 ? 15 : 19;
    let offsetB = 25;
    center2X = leftToRight
      ? Math.floor(
          (((dropPos.left + dropPos.right) / 2 - center1X) / 34) * (val - 27) +
            offsetA
        )
      : ((center1X - (dropPos.left + dropPos.right) / 2) / 34) *
          Math.abs(val - 27) +
        offsetB;
    // center2X =
    // center2X = Math.floor(((dropPos.left + dropPos.right) / 61) * (val - 27)); // for 42 speed
  }
  var center2Y = Math.floor((dropPos.top + dropPos.bottom) / 2);

  // mouse over dragged element and mousedown
  fireMouseEvent("mousemove", elemDrag, center1X, center1Y);
  fireMouseEvent("mouseenter", elemDrag, center1X, center1Y);
  fireMouseEvent("mouseover", elemDrag, center1X, center1Y);
  fireMouseEvent("mousedown", elemDrag, center1X, center1Y);

  // start dragging process over to drop target
  fireMouseEvent("dragstart", elemDrag, center1X, center1Y);
  fireMouseEvent("drag", elemDrag, center1X, center1Y);
  fireMouseEvent("mousemove", elemDrag, center1X, center1Y);
  fireMouseEvent("drag", elemDrag, center2X, center2Y);
  fireMouseEvent("mousemove", elemDrop, center2X, center2Y);

  // trigger dragging process on top of drop target
  fireMouseEvent("mouseenter", elemDrop, center2X, center2Y);
  fireMouseEvent("dragenter", elemDrop, center2X, center2Y);
  fireMouseEvent("mouseover", elemDrop, center2X, center2Y);
  fireMouseEvent("dragover", elemDrop, center2X, center2Y);

  // release dragged element on top of drop target
  fireMouseEvent("drop", elemDrop, center2X, center2Y);
  fireMouseEvent("dragend", elemDrag, center2X, center2Y);
  fireMouseEvent("mouseup", elemDrag, center2X, center2Y);

  return true;
};

function filterClass(_filterClass: string) {
  switch (_filterClass) {
    case "Beast":
      (document.querySelectorAll(".checkbox")[0] as HTMLElement).click();
      break;
    case "Aqua":
      (document.querySelectorAll(".checkbox")[1] as HTMLElement).click();
      break;
    case "Plant":
      (document.querySelectorAll(".checkbox")[2] as HTMLElement).click();
      break;
    case "Bird":
      (document.querySelectorAll(".checkbox")[3] as HTMLElement).click();
      break;
    case "Bug":
      (document.querySelectorAll(".checkbox")[4] as HTMLElement).click();
      break;
    case "Reptile":
      (document.querySelectorAll(".checkbox")[5] as HTMLElement).click();
      break;
    case "Mech":
      (document.querySelectorAll(".checkbox")[6] as HTMLElement).click();
      break;
    case "Dawn":
      (document.querySelectorAll(".checkbox")[7] as HTMLElement).click();
      break;
    case "Dusk":
      (document.querySelectorAll(".checkbox")[8] as HTMLElement).click();
      break;
  }
}

/**
 * Fired when a message is sent from either an extension process or a content script.
 */
chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
