import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { ShoppingCart } from "@material-ui/icons";
import { Box, Button, Badge } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.primary.main
    // position: props => (props.fixed ? "fixed" : ""),
    // "& button": {
    //   color: "white",
    //   "& span": {
    //     textDecoration: "underline"
    //   }
    // }
  }
}));

export default function Header(props) {
  const classes = useStyles(props);
  return (
    <AppBar position="static" className="nav" className={classes.root}>
      <Toolbar variant="dense">
        <Typography variant="h6" color="inherit">
          Shopping Cart ReactJS 14
        </Typography>
        <Box ml="auto">
          <Button>
            <Link to="/home">Home</Link>
          </Button>
          <Button>
            <Link to="/product">Products</Link>
          </Button>
          <Button>
            <Link to="/detail">Detail</Link>
          </Button>
        </Box>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <Badge badgeContent={5} color="secondary">
            <ShoppingCart />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
