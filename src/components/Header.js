import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { ShoppingCart } from "@material-ui/icons";
import { Box, Button, Badge } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
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
function Header(props) {
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
          <Link to="/cart">
            <Badge badgeContent={props.quantity} color="secondary">
              <ShoppingCart />
            </Badge>
          </Link>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
const mapStateToProps = state => {
  const quantity = state.cart.reduce((count, product_in_cart) => {
    return (count = count + product_in_cart.quantity);
  }, 0);
  return {
    quantity: quantity
  };
};
export default connect(mapStateToProps)(Header);
