import React from "react";
import { Container, Grid, Typography, Button, Box } from "@material-ui/core";
import CartProduct from "./CartProduct";

import { connect } from "react-redux";
class Cart extends React.Component {
  render() {
    return (
      <Container>
        <Grid container spacing={3}>
          <Grid item md={7}>
            <Box p={2}>
              {this.props.cart_data.map((cart_item) => {
                return <CartProduct key={cart_item.id} cart={cart_item} />;
              })}
            </Box>
          </Grid>
          <Grid item md={5}>
            <Box boxShadow="0 0 25px rgba(0,0,0,0.16)" p={2}>
              <Typography>Tổng tiền: {this.props.totalMoney}</Typography>
              <Button>Thanh toán</Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  const totalMoney = state.cart.reduce((cash, money_in_cart) => {
    return (cash = cash + money_in_cart.totalMoney);
  }, 0);
  return {
    cart_data: state.cart,
    totalMoney: totalMoney,
  };
};
const mapDispatchToProps = null;
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
