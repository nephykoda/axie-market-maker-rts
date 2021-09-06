import React, { useContext } from "react";
import { Button, ButtonGroup } from "@material-ui/core";
import { FiltersContext } from "../store/filters-context";

// React.FC<> allows you to define extra props on top of standard ones
const ButtonList: React.FC<{ onSelectButton: ({}) => void }> = (props) => {
  const filtersCtx = useContext(FiltersContext);
  const buttonHandler = (itemId: any) => {
    const selectedFilter = filtersCtx.items.filter(
      (item) => item.id === itemId
    );
    props.onSelectButton(selectedFilter[0]);
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
            onClick={() => {
              buttonHandler(item.id);
            }}
          >
            {item.name}
          </Button>
          <Button
            onClick={filtersCtx.removeAxieFilters.bind(null, item.id)}
            variant="outlined"
            size="small"
          >
            x
          </Button>
        </ButtonGroup>
      ))}
    </div>
  );
};

export default ButtonList;
