import React, { useState, Component } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { withRouter } from "react-router-dom";
import axios from "axios";
import {
  Typography,
  TextField,
  Grid,
  Box,
  Button,
  Container
} from "@material-ui/core";
import { withStyles } from "@material-ui/core";
import { connect } from "react-redux";
const styles = theme => ({
  img_container: {
    boxShadow: theme.shadows[3]
  },
  big_img: {
    minHeight: "300px",
    display: "flex",
    justifyContent: "center"
  },
  small_img: {
    minHeight: "100px",
    width: "100%",
    border: "1px solid black"
  }
});
class ProductDetail extends Component {
  //state-hook
  // class
  //   state{
  //     size
  //     quantity
  //   }
  state = {
    selected_size: " ",
    quantity: 0
  };
  handleChange = event => {
    this.setState({ selected_size: event.target.value });
  };
  // componentDidMount() {
  //   const { products, match } = this.props;
  //   const id = match.params.masanpham;
  //   const product = products.find(product => {
  //     return product.id === Number(id);
  //   });
  //   console.log(product);
  // }
  componentDidMount() {
    axios
      .get(
        "https://kmin-academy-shopping-cart-api.herokuapp.com/products/${this.props.match.params.masanpham}"
      )
      .then(res => {
        const { id, name, price, size, src } = res.data;
        this.setState({
          id,
          name,
          price,
          size,
          img: src
        });
      })
      .catch(e => {
        console.log(e);
      });
  }
  handleClickBtn = () => {
    const { id, name, price, selected_size, img } = this.state;
    this.props.addToCart({
      id_cart: "cart_" + Date.now() + Math.random(),
      id_product: id,
      name,
      price,
      img,
      size: selected_size
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <Container>
        <Grid container>
          <Grid item md={4} className={classes.img_container}>
            <Box className={classes.big_img}>Big img</Box>
            <Box display="flex">
              <Box className={classes.small_img}>small</Box>
              <Box className={classes.small_img}>small</Box>
              <Box className={classes.small_img}>small</Box>
            </Box>
          </Grid>
          <Grid item md={8}>
            <Typography variant="h3">
              {/* {this.props.match.params.masanpham} */}
            </Typography>
            <Typography variant="h4">Gia san pham</Typography>
            <FormControl component="fieldset">
              <FormLabel component="legend">Size:</FormLabel>
              <RadioGroup
                aria-label="gender"
                name="gender1"
                value={this.state.size}
                onChange={this.handleChange}
              >
                <FormControlLabel value="S" control={<Radio />} label="S" />
                <FormControlLabel value="L" control={<Radio />} label="L" />
                <FormControlLabel value="XL" control={<Radio />} label="XL" />
              </RadioGroup>
            </FormControl>
            <Box>
              <TextField
                type="number"
                value={this.state.quantity}
                onChange={event => {
                  this.setState({ quantity: event.target.value });
                }}
              ></TextField>
              <Button onClick={this.handleClickBtn}>Add to cart</Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addToCart: product => {
      dispatch({ type: "ADD_TO_CART", payload: product });
    }
  };
};
export default connect(
  null,
  mapDispatchToProps
)(withRouter(withStyles(styles)(ProductDetail)));
