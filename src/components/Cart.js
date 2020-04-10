import React from "react";
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  Snackbar,
} from "@material-ui/core";
import CartProduct from "./CartProduct";
import { connect } from "react-redux";
import axios from "axios";
import CheckoutForm from "./CheckoutForm";
import MuiAlert from "@material-ui/lab/Alert";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
class Cart extends React.Component {
  state = {
    open: false,
    openAlert: false,
    alert: "",
    severity: "success",
  };
  handleCloseForm = () => {
    this.setState({ open: false });
  };
  // handleToggleForm = () => {
  //   this.setState({ open: !this.state.open });
  // };
  handleCheckout = () => {
    this.setState({ open: true });
  };
  handleCloseSnackbar = () => {
    this.setState({ openAlert: false });
  };
  handleSendForm = (form) => {
    axios
      .post("https://kmin-academy-shopping-cart-api.herokuapp.com/cart", {
        ...form,
        id: "order" + Date.now() + Math.random(),
        products: this.props.cart_data,
      })
      .then((res) => {
        this.setState({
          alert: "Đặt hàng thành công!",
          severity: "success",
          openAlert: true,
          open: false,
        });
      })
      .catch((err) => {
        this.setState({
          alert: "Đặt hàng thất bại!",
          openAlert: true,
          severity: "error",
          open: false,
        });
      });
  };
  render() {
    const total = this.props.cart_data.reduce((total, pic) => {
      return (total = total + pic.quantity * pic.price);
    }, 0);
    return (
      <Container>
        <Grid container spacing={3}>
          <Grid item md={7}>
            <Box p={2}>
              {this.props.cart_data.map((cart_item) => {
                return (
                  <CartProduct
                    updateCart={this.props.updateCart}
                    deleteCart={this.props.deleteCart}
                    key={cart_item.id_cart}
                    cart={cart_item}
                  />
                );
              })}
            </Box>
          </Grid>
          <Grid item md={5}>
            <Box boxShadow="0 0 25px rgba(0,0,0,0.16)" p={2}>
              <Typography>Tổng tiền: {total}</Typography>
              <Button onClick={this.handleCheckout}>Thanh toán</Button>
            </Box>
          </Grid>
        </Grid>
        <CheckoutForm
          open={this.state.open}
          handleClose={this.handleToggleForm}
          handleSendForm={this.handleSendForm}
        />
        <Snackbar
          open={this.state.openAlert}
          autoHideDuration={6000}
          onClose={this.handleCloseSnackbar}
        >
          <Alert
            onClose={this.handleCloseSnackbar}
            severity={this.state.severity}
          >
            {this.state.alert}
          </Alert>
        </Snackbar>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    cart_data: state.cart,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateCart: (id_cart, value) => {
      dispatch({ type: "UPDATE_TO_CART", payload: { id_cart, value } });
    },
    deleteCart: (id_cart) => {
      dispatch({ type: "DELETE_CART", payload: id_cart });
    },
    clearCart: () => {
      dispatch({ type: "CLEAR_CART" });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
