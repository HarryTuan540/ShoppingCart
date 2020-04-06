import React from "react";
import { TextField, Grid, Typography } from "@material-ui/core";
export default function CartProduct(props) {
  const { img, name, price, quantity } = props.cart;
  return (
    <Grid container>
      <Grid item md={4}>
        <img style={{ maxWidth: "100%" }} src={img} alt="cart img" />
      </Grid>
      <Grid item md={8}>
        <Typography>
          {name} x {quantity}{" "}
        </Typography>
        <Typography>{price * quantity}$</Typography>
        <TextField type="number" value={quantity} />
      </Grid>
    </Grid>
  );
}
