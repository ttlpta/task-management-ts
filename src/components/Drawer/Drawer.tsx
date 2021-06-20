import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from '../../hooks'
import {
  Link
} from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import MailIcon from "@material-ui/icons/Mail";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { toggleDrawer } from "../../redux/slices/uiSlice";

import { uiDrawerState, getMenuItems } from "../../redux/slices/uiSlice";

import DrawerStyled from "./DrawerStyled";
import { MenuItem } from "../../type/api";

export default function Drawer() {
  const uiDrawer = useAppSelector(uiDrawerState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    !uiDrawer.list.length && dispatch(getMenuItems());
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  const handleToggleDrawer = () => {
    dispatch(toggleDrawer());
  };

  return (
    <DrawerStyled
      anchor={"left"}
      open={uiDrawer.open}
      onClose={handleToggleDrawer}
    >
      <Box paddingTop={8}>
        <Divider />
        <List>
          {uiDrawer.list.map((item: MenuItem) => (
            <Link to={`/${item.code}`} key={item.code}>
              <ListItem>
                <ListItemIcon>
                  <MailIcon />
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Box>
    </DrawerStyled>
  );
}
