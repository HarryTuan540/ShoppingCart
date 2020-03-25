import React from "react";
import { Grid, Box, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
export default function Product(props) {
  const { id, name, price, img } = props;

  return (
    <Grid item md={3}>
      <Box boxShadow={5}></Box>
      <Box boxShadow={5}>
        <Box
          height={250}
          overflow="hidden"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <img
            src={img}
            alt="product"
            style={{ maxWidth: "100%", maxHeight: "100" }}
          />
        </Box>
        <Box p={2}>
          <Typography color="primary" variant="h5">
            <Link to={"/product/" + id}>{name}</Link>
          </Typography>
          <Typography color="secondary" variant="h4">
            {price}$
          </Typography>
          <Button variant="contained" color="primary">
            Add to cart
          </Button>
        </Box>
      </Box>
    </Grid>
  );
}
