import React, { useContext, useRef, useEffect } from "react";
import { Button, ButtonGroup, Typography } from "@material-ui/core";
import { FiltersContext } from "../store/filters-context";
import { IconButton } from "@material-ui/core";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import CancelIcon from "@material-ui/icons/Block";
import EditIcon from "@material-ui/icons/Edit";
import { Cancel } from "@material-ui/icons";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper, { PopperPlacementType } from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import ButtonPreview from "./ButtonPreview";
import Tooltip from "@material-ui/core/Tooltip";
import { createTheme, ThemeProvider, withStyles } from "@material-ui/core/styles";

// React.FC<> allows you to define extra props on top of standard ones
const ButtonList: React.FC<{ onSelectButton: ({}) => void }> = (props) => {
  const [open, setOpen] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [placement, setPlacement] = React.useState<PopperPlacementType>();
  const filtersCtx = useContext(FiltersContext);
  // const itemsRef = useRef(HTMLDivElement | null)[]>([])
  const axieFilterItems = filtersCtx.items;
  const refs: React.MutableRefObject<React.RefObject<any>[]> = useRef(Array.from({ length: axieFilterItems.length }, (a) => React.createRef()));

  const handleDropDownItemHover = (event: any) => {
    setHover(true);
  };
  const handleDropDownItemHoverExit = (event: any) => {
    setHover(false);
  };

  const handleMenuItemClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, index: number) => {
    setOpen(false);
  };

  const handleToggle = (e: any) => {
    setOpen((prevOpen) => !prevOpen);
    if (open === false) {
      setAnchorEl(e.currentTarget);
      setPlacement("bottom-end");
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  const btnOptions = ["Edit", "Delete"];

  const buttonHandler = (itemId: any) => {
    const selectedFilter = filtersCtx.items.filter((item) => item.id === itemId);
    props.onSelectButton(selectedFilter[0]);
  };

  return (
    <div>
      {filtersCtx.items.map((item, index) => (
        <>
          <ButtonGroup style={{ boxShadow: "0 0 0 0", margin: 5 }} variant="contained" color="primary" aria-label="contained primary button group" key={item.id}>
            <Button
              style={{ textTransform: "none", borderRadius: "30px 0px 0px 30px" }}
              onClick={() => {
                buttonHandler(item.id);
              }}
            >
              <div className="regular">{item.name}</div>
            </Button>
            {/* <ThemeProvider theme={theme}> */}
            {/* TOOLTIP FOR MOUSEOVER EFFECT: REPLACE 'open' WITH 'open={!open && hover}'  */}
            <Tooltip id={item.id} arrow open placement="bottom-end" title={<ButtonPreview axieFilter={item} />}>
              <Button
                style={{ borderRadius: "0px 30px 30px 0px" }}
                color="primary"
                size="small"
                aria-controls={open ? "split-button-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-label="select merge strategy"
                aria-haspopup="menu"
                onClick={handleToggle}
                onMouseOver={handleDropDownItemHover}
                onMouseLeave={handleDropDownItemHoverExit}
                // ref={(el: HTMLButtonElement | null) => (itemsRef.current[i] = el)}
                ref={refs.current[index]}
              >
                <ArrowDropDownIcon />
              </Button>
            </Tooltip>
            {/* </ThemeProvider> */}
          </ButtonGroup>
          <Popper anchorEl={anchorEl} open={open} role={undefined} placement="bottom-end" transition disablePortal>
            <Paper style={{ padding: 0 }}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList style={{ padding: 0 }} id="split-button-menu">
                  {btnOptions.map((option, i) => (
                    <MenuItem key={option} onClick={(event) => handleMenuItemClick(event, i)}>
                      {option === "Edit" ? <EditIcon style={{ padding: 0, height: 13 }} /> : <CancelIcon style={{ padding: 0, height: 13 }} />}
                      <div style={{ fontSize: 13 }} className="regular">
                        {option}
                      </div>
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Popper>
        </>
      ))}
    </div>
  );
};

export default ButtonList;
