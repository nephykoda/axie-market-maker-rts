import React, { useContext } from "react";
import { Button, ButtonGroup } from "@material-ui/core";
import { FiltersContext } from "../store/filters-context";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

// React.FC<> allows you to define extra props on top of standard ones
const ButtonList: React.FC = (props) => {
  const filtersCtx = useContext(FiltersContext);
  const buttonHandler = (itemId: any) => {
    const newZ = filtersCtx.items.filter((item) => item.id === itemId);
    console.log(newZ[0]);
  };

  return (
    <div>
      {filtersCtx.items.map((item) => (
        <ButtonGroup
          style={{ margin: 5 }}
          variant="contained"
          color="primary"
          aria-label="contained primary button group"
          key={item.id}
        >
          <Button
            onClick={() => buttonHandler(item.id)}
            // variant="contained"
            // color="primary"
            // key={item.id}
            // style={{ margin: 5 }}
          >
            {item.name}
          </Button>
          <Button
            onClick={filtersCtx.removeAxieFilters.bind(null, item.id)}
            variant="outlined"
            size="small"
            // variant="contained"
            // color="primary"
            // key={item.id}
            // style={{ margin: 5 }}
          >
            x
          </Button>
        </ButtonGroup>
      ))}
    </div>
  );
};

export default ButtonList;
