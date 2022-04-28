import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  addItemAction,
  decreaseItemAction,
  updateCategoryAction,
  updatePriceAction,
  cartTotalAction,
  clearCartAction
} from "../../redux/reducers/actions.js";
import "./header.scss";
//svg icons
import logoIcon from "../../images/logo.svg";
import cartIcon from "../../images/cart.svg";
import expandIcon from "../../images/expand.svg";
import expandLess from "../../images/expandLess.svg";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      displayCart: "none",
      displayPicker: "none",
      checkout: "none",
      expandSvg: expandIcon
    };
  }
//add to cart
  onAdditem(content) {
    this.props.addItemAction(content);
    this.props.cartTotalAction();
  }
//decrease item in cart
  onDecreaseitem(id) {
    this.props.decreaseItemAction(id);
    this.props.cartTotalAction();
  }
//clear cart
  onClearCart() {
    this.props.clearCartAction();
    this.props.cartTotalAction();
  }

//function to display cart
  showCart = () => {
    if (this.state.displayCart === "none") {
      this.setState({ displayCart: "unset" });
      document.querySelector(".change").classList.add("opacity");
      document.body.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    } else {
      this.setState({ displayCart: "none" });
      document.querySelector(".change").classList.remove("opacity");
      document.body.style.backgroundColor = "unset";
    }

    this.state.displayPicker === "unset" &&
      this.setState({ displayPicker: "none", expandSvg: expandIcon });
  };

//function called to display currencies
  showCurrency = () => {
    this.state.displayPicker === "none"
      ? this.setState({ displayPicker: "unset", expandSvg: expandLess })
      : this.setState({ displayPicker: "none", expandSvg: expandIcon });

    this.state.displayCart === "unset" &&
      this.setState({ displayCart: "none" });
    document.querySelector(".change").classList.remove("opacity");
    document.body.style.backgroundColor = "unset";
  };

//to update the currency symbol & price on all pages
  updateSymbol = (label) => {
    const count = (index) => {
      this.props.updatePriceAction(index);
      this.props.cartTotalAction();
      this.showCurrency();
    };

    switch (label) {
      case "USD":
        return count(0);
      case "GBP":
        return count(1);
      case "AUD":
        return count(2);
      case "JPY":
        return count(3);
      case "RUB":
        return count(4);
      default:
        break;
    }
  };

//to update category on the category page
  updateCategory = (e) => {
    const name = e.target.innerHTML;
    const count = (index) => this.props.updateCategoryAction(index);

    switch (name) {
      case "all":
        return count(0);
      case "clothes":
        return count(1);
      case "tech":
        return count(2);
      default:
        break;
    }
  };

  render() {
//index of array for price pick from redux store 
    const priceIndex = this.props.price;
//current state of cart from redux store
    const cart = this.props.cart;
//current total and quantity of cart
    const { total, cartQuantity } = this.props.cartTotal;
//data from graphql pollo
    const currencies = this.props.data.currencies;
    const categories = this.props.data.categories;
//to change css style for category
    const active = this.props.category;

    return (
      <>
        <header className="header">
          <div>
            <ul>
              {categories.map(({ name }, i) => (
                <Link key={i} to="/">
                  <li
                    className={`${i === active ? "active" : ""}`}
                    onClick={this.updateCategory}
                  >
                    {name}
                  </li>
                </Link>
              ))}
            </ul>
          </div>

          <div className="animate btn">
            <Link to="/">
              <img src={logoIcon} alt="logo" />
            </Link>
          </div>

          <div>
            <div onClick={this.showCurrency}>
              <b>{currencies[priceIndex].symbol}</b>
              <img src={this.state.expandSvg} alt="expand" />
            </div>
            <span>{cartQuantity}</span>
            <img onClick={this.showCart} src={cartIcon} alt="cart" />
          </div>

          <div style={{ display: this.state.displayPicker }}>
            <ul>
              {currencies.map(({ label, symbol }) => (
                <li key={label} onClick={() => this.updateSymbol(label)}>
                  {symbol} {label}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ display: this.state.displayCart }} className="div5">
            {cart.map((data) => (
              <div className="div6" key={data.id}>
                <div>
                  <div>
                    <p>{data.name}</p>
                    <p>{data.brand}</p>

                    <b>
                      {data.prices[priceIndex].currency.symbol}
                      {data.prices[priceIndex].amount * data.quantity}
                    </b>

                    {data.attributes.map(({ name, items, type, id }) => (
                      <>
                        <p key={id}>{name}:</p>
                        <div>
                          {items.map(({ value, id }) => (
                            <div key={id} className="animate btn">
                              {type === "text" ? (
                                <span>{value}</span>
                              ) : (
                                <span
                                  style={{ backgroundColor: `${value}` }}
                                ></span>
                              )}
                            </div>
                          ))}
                        </div>
                      </>
                    ))}
                  </div>
                </div>

                <div>
                  <div>
                    <span
                      onClick={() => this.onAdditem({ ...data, quantity: 1 })}
                      className="span animate btn"
                    >
                      +
                    </span>
                    <span>{data.quantity}</span>
                    <span
                      onClick={() => this.onDecreaseitem(data.id)}
                      className="span animate btn"
                    >
                      -
                    </span>
                  </div>
                  <div
                    style={{ backgroundImage: "url(" + data.gallery[0] + ")" }}
                  ></div>
                </div>
              </div>
            ))}

            <div className="div7">
              <b>Total:</b>
              <b>
                {currencies[priceIndex].symbol} {total}
              </b>
            </div>
            <div className="div7" onClick={this.showCart}>
              <Link to="cart">
                <button className="animate btn">VIEW BAG</button>
              </Link>
              <button
                className="animate btn"
                onClick={() => {
                  this.setState({ checkout: "unset" });
                  this.onClearCart();
                }}
              >
                CHECK OUT
              </button>
            </div>
          </div>
        </header>

        <div style={{ display: this.state.checkout }} className="alert">
          <span
            onClick={() => this.setState({ checkout: "none" })}
            className="closebtn"
          >
            &times;
          </span>
          You have successfully checked out!
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    category: state.category,
    cartTotal: state.cartTotal,
    price: state.price
  };
};
export default connect(mapStateToProps, {
  addItemAction,
  decreaseItemAction,
  updateCategoryAction,
  updatePriceAction,
  cartTotalAction,
  clearCartAction
})(Header);
