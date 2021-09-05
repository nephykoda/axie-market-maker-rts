export type DOMMessage = {
  type: "GET_DOM";
};

export type DOMMessageResponse = {
  title: string;
  headlines: string[];
};

export type DOMFilterBuild = {
  type: "FILTER_BUILD";
  filterConditions: string[];
};
