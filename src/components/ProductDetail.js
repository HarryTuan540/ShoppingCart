import React, { useState, Component } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { withRouter } from "react-router-dom";
import {
  Typography,
  TextField,
  Grid,
  Box,
  Button,
  Container
} from "@material-ui/core";
import { withStyles } from "@material-ui/core";
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
    size: "S"
  };
  handleChange = event => {
    this.setState({ size: event.target.value });
  };
  componentDidMount() {
    const { products, match } = this.props;
    const id = match.params.masanpham;
    const product = products.find(product => {
      return product.id === Number(id);
    });
    console.log(product);
  }
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
              <TextField type="number"></TextField>
              <Button>Add to cart</Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default withRouter(withStyles(styles)(ProductDetail));
