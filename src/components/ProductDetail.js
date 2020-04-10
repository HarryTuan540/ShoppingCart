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
  Container,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core";
import { connect } from "react-redux";
const styles = (theme) => ({
  img_container: {
    boxShadow: theme.shadows[3],
  },
  big_img: {
    minHeight: "300px",
    display: "flex",
    justifyContent: "center",
  },
  small_img: {
    minHeight: "100px",
    width: "100%",
    border: "1px solid black",
  },
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
    quantity: 0,
  };
  handleChange = (event) => {
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
  // componentDidMount() {
  //   axios
  //     .get(
  //       "https://kmin-academy-shopping-cart-api.herokuapp.com/products/${this.props.match.params.masanpham}"
  //     )
  //     .then((res) => {
  //       const { id, name, price, size, src } = res.data;
  //       this.setState({
  //         id,
  //         name,
  //         price,
  //         size,
  //         img: src,
  //       });
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // }
  handleClickBtn = () => {
    const { id, name, price, selected_size, img } = this.state;
    this.props.addToCart({
      id_cart: "cart_" + Date.now() + Math.random(),
      id_product: id,
      name,
      price,
      img,
      size: selected_size,
    });
  };

  componentDidMount() {
    const { match } = this.props;
    const idProduct = match.params.masanpham;
    axios
      .get(
        `https://kmin-academy-shopping-cart-api.herokuapp.com/products/${idProduct}`
      )
      .then((res) => {
        const { id, name, price, size, src } = res.data;
        console.log(res.data);
        this.setState({
          id,
          name,
          price,
          size,
          img: src,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { classes } = this.props;
    const { id, name, price, size, img, selected_size } = this.state;
    console.log(this.state);
    return (
      <Container>
        <Grid container>
          <Grid item md={4} className={classes.img_container}>
            <Box className={classes.big_img}>
              <img src={img} alt="san pham"></img>
            </Box>
          </Grid>
          <Grid item md={8}>
            <Typography variant="h3">
              {/* {this.props.match.params.masanpham} */}
              {this.state.id}
            </Typography>
            <Typography variant="h4">Gia san pham:{price}</Typography>
            <FormControl component="fieldset">
              <FormLabel component="legend">Size:{size}</FormLabel>
              <RadioGroup
                aria-label="gender"
                name="gender1"
                value={selected_size}
                onChange={this.handleChange}
              >
                {size &&
                  size.map((item, index) => (
                    <FormControlLabel
                      value={item}
                      control={<Radio />}
                      label={item}
                    />
                  ))}
              </RadioGroup>
            </FormControl>
            <Box>
              <TextField
                type="number"
                value={this.state.quantity}
                onChange={(event) => {
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

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (product) => {
      dispatch({ type: "ADD_TO_CART", payload: product });
    },
  };
};
export default connect(
  null,
  mapDispatchToProps
)(withRouter(withStyles(styles)(ProductDetail)));

/*
1. Redux
  - Sự phức tạp trong việc quản lý State
  - Redux là gì?
    . Thư viện
    . Dùng để quản lý State
  - Hiểu về luồng của Redux
    . Store (lưu trữ state)
    . Reducer (là tương tác với state trong store)
    . Action (những thông tin, lệnh thao tác với state trong store)
    . Reducer vào Store thay đổi State khi Dispatch 1 Action
  - Thiết lập Reducer và store
    . Thiết lập store
      _ createStore của Redux
      _ reducer là 1 hàm (nhận vào state,action)
      _ truyền reducer vào createStore
  - Dispatching Actions
    . Action là Object (gồm Type và Payload(option))
    . Là 1 phương thức của store để truyền action vào trong reducer và thực thi reducer
  - Thêm Subscriptions
    . store.subscribe(callback)
  2. Ấp dụng Redux vào React
  - Kết nối React vs Redux
    . Thư viện react-redux
    . Component Provider bọc React App lại
  - Kết nối Store vs React
    . truyền store xuống cho provider thông qua prop "store"
  - Truyền state xuống cho Component với mapStateToProps
    . mapStateToProps là một function nhận vào state là tham số (state of Store)
    . truyền vào làm tham số đầu tiên của phương thức connect
    . func trả về 1 object key chính là tên của prop và value là giá trị của props mới
  - Dispatch action từ Componen với mapDispatchToProps
    . mapDispatchToProps là function nhận vào phương thức dispatch của store
    . truyền vào làm tham số thứ 2 trong phương thức connect
    . func trả về 1 object key chính là tên của prop và value là giá trị của prop mới
  - Truyền và nhận dữ liệu với action
  - Switch case trong reducer
  - Cập nhật state (thêm vào giỏ hàng)
  - Chỉnh sửa giỏ hàng
  - Xóa sản phẩm khỏi giỏ hàng
  - Liên kết state với nhiều component

*/
