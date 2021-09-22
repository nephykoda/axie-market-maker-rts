import { useState, useEffect } from "react";
import * as React from "react";
import AxieFilters from "../model/filters";

type FiltersContextObj = {
  items: AxieFilters[];
  addAxieFilters: (axieFilters: AxieFilters) => void;
  removeAxieFilters: (id: string) => void;
};

export const FiltersContext = React.createContext<FiltersContextObj>({
  items: [],
  addAxieFilters: () => {},
  removeAxieFilters: (id: string) => {},
});

const FiltersContextProvider: React.FC = (props) => {
  const [axieFilters, setAxieFilters] = useState<AxieFilters[]>([]);

  const addAxieFiltersHandler = (axieFilter: AxieFilters) => {
    const newAxieFilter = new AxieFilters(axieFilter.name, axieFilter.classes, axieFilter.parts, axieFilter.breed, axieFilter.health, axieFilter.speed, axieFilter.skill, axieFilter.morale);
    // JSON.stringify(newAxieFilter);
    setAxieFilters((prevAxieFilters) => {
      let newAxieFilterObject = prevAxieFilters.concat(newAxieFilter);
      // let strPrevAxieFilters = String(prevAxieFilters);
      // if (localStorage.getItem(strPrevAxieFilters)) {
      //   localStorage.removeItem(strPrevAxieFilters);
      // }
      // localStorage.setItem(String(newAxieFilterObject), "true");
      // console.log(JSON.stringify(newAxieFilter));
      return newAxieFilterObject;
    });
  };

  const removeTodoHandler = (axieFilterId: string) => {
    setAxieFilters((prevAxieFilters) => {
      return prevAxieFilters.filter((axieFilter) => axieFilter.id !== axieFilterId);
    });
  };

  const contextValue: FiltersContextObj = {
    items: axieFilters,
    addAxieFilters: addAxieFiltersHandler,
    removeAxieFilters: removeTodoHandler,
  };

  useEffect(() => {
    if (chrome.storage) {
      chrome.storage.local.get(["PRESET_FILTERS"], (item: object) => {
        const aArray = Object.entries(item);
        console.log(aArray);
        let x = aArray[0][1];
        console.log(x);
        setAxieFilters(x);
      });
    }
  }, []);

  useEffect(() => {
    // console.log(JSON.stringify(axieFilters));
    // localStorage.clear();
    // localStorage.setItem("PresetFilters", JSON.stringify(axieFilters));
    // console.log(localStorage.getItem("PresetFilters"));
    // chrome.storage.local.clear();
    console.log(axieFilters);
    if (chrome.storage) {
      chrome.storage.local.set({ PRESET_FILTERS: axieFilters }, () => {
        console.log(chrome.storage.local.get(["PRESET_FILTERS"]));
      });
    }
  }, [axieFilters]);

  return <FiltersContext.Provider value={contextValue}>{props.children}</FiltersContext.Provider>;
};

export default FiltersContextProvider;
