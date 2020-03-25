import React, { Component } from "react";
import ProductList from "./ProductList";
import Header from "./Header";
import Footer from "./Footer";
import { withStyles } from "@material-ui/core/styles";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import ProductDetail from "./ProductDetail";
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
      [
        {
          id: 0,
          name: "San pham 0",
          price: 17,
          img:
            "https://media3.scdn.vn/img2/2018/12_2/WLLirD_simg_de2fe0_500x500_maxb.jpg"
        },
        {
          id: 1,
          name: "San pham 1",
          price: 17,
          img:
            "https://bizweb.dktcdn.net/thumb/large/100/331/067/products/o1cn01sfxnjk1nptchzm8ie-77341563.jpg?v=1578544551000"
        },
        {
          id: 2,
          name: "San pham 2",
          price: 7,
          img:
            "https://bizweb.dktcdn.net/thumb/large/100/331/067/products/o1cn01regi8e2b8hxncbzby-3941668294.jpg?v=1578036373000"
        },
        {
          id: 3,
          name: "San pham 3",
          price: 2,
          img:
            "https://bizweb.dktcdn.net/thumb/large/100/331/067/products/76188704-573162650114911-8538891461192581120-n.jpg?v=1573551725000"
        },
        {
          id: 4,
          name: "San pham 4",
          price: 11,
          img:
            "https://bizweb.dktcdn.net/thumb/large/100/331/067/products/71854008-1158446411028364-4078206245100584960-n.jpg?v=1570432648000"
        },
        {
          id: 5,
          name: "San pham 5",
          price: 16,
          img:
            "https://bizweb.dktcdn.net/thumb/large/100/331/067/products/89665665-1574693899352953-4204620975301459968-o.jpg?v=1584088759000"
        },
        {
          id: 6,
          name: "San pham 6",
          price: 17,
          img: "https://cf.shopee.vn/file/addb75d0c478f2309aaa648c336e4a2f"
        },
        {
          id: 7,
          name: "San pham 7",
          price: 13,
          img:
            "https://media3.scdn.vn/img3/2019/2_14/Tzg1i9_simg_de2fe0_500x500_maxb.jpg"
        },
        {
          id: 8,
          name: "San pham 8",
          price: 19,
          img:
            "https://vn-test-11.slatic.net/original/e61bdc39c9c964b4f1d149f54bc56213.jpg_600x600q80.jpg"
        },
        {
          id: 9,
          name: "San pham 9",
          price: 5,
          img:
            "https://linhvnxk.com/wp-content/uploads/2019/01/ao-hoodie-ni-kswiss-xuat-khau-han-quoc-3-1.jpg"
        },
        {
          id: 10,
          name: "San pham 10",
          price: 6,
          img:
            "https://thoitrangteenthienphuc.vn/upload/sanpham/ao-hoodie-ni-ngoai-2-6744.jpg"
        },
        {
          id: 11,
          name: "San pham 11",
          price: 14,
          img:
            "https://vn-live-03.slatic.net/original/d58eec00080becf012a31d9fc431de94.jpg"
        }
      ]
  };
  render() {
    return (
      <div>
        {/* <Header /> */}
        <Header fixed />
        <Switch>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route path="/product">
            <ProductList
              data={this.state.products}
              products={this.state.products}
            />
          </Route>
          <Route
            path="/product/:masanpham"
            render={() => <ProductDetail products={this.state.products} />}
          ></Route>
          <Route path="/detail" component={ProductDetail}></Route>
          <Route>404 PAGE</Route>
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withStyles(style)(ShoppingCart);
