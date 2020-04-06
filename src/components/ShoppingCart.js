import React, { Component } from "react";
import ProductList from "./ProductList";
import Header from "./Header";
import Footer from "./Footer";
import { withStyles } from "@material-ui/core/styles";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Cart from "./Cart";
import ProductDetail from "./ProductDetail";
import axios from "axios";
const style = theme => ({
  root: {
    background: "black"
  }
});
class ShoppingCart extends Component {
  state = {
    products:
      // id: 1,
      // name: "Sarn",
      // price: 20,
      [],
    isLoading: false,
    page: 1,
    limit: 8
  };
  componentDidMount() {
    //promise
    this.setState({ isLoading: true });
    axios
      .get("http://kmin-academy-shopping-cart-api.herokuapp.com/products")
      .then(res => {
        const { data } = res;
        this.setState({ products: data, isLoading: false });
      })
      .catch(err => {
        console.log(err);
      });
  }
  handleChangePage = page => {
    this.setState({ page: page });
  };
  render() {
    const { page, limit } = this.state;
    // if (this.state.products.length % limit > 0) {
    //   this.setState({
    //     total: Math.floor(this.state.products.length / limit) + 1
    //   });
    // } else {
    //   this.setState({ total: Math.floor(this.state.products.length / limit) });
    // }
    return (
      <div>
        {/* <Header /> */}
        <Header fixed />
        <Switch>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/product">
            <ProductList
              isLoading={this.state.isLoading}
              total={this.state.products.length}
              limit={this.state.limit}
              page={this.state.page}
              products={[...this.state.products].splice(
                (page - 1) * limit,
                limit
              )}
              handleChangePage={this.handleChangePage}
            />
          </Route>
          <Route
            path="/product/:masanpham"
            render={() => <ProductDetail products={this.state.products} />}
          ></Route>
          <Route path="/detail" component={ProductDetail}></Route>
          <Route path="/cart" component={Cart}></Route>
          <Route>404 PAGE</Route>
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withStyles(style)(ShoppingCart);
