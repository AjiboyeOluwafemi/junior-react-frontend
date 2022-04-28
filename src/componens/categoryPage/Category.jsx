import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  addItemAction,
  cartTotalAction
} from "../../redux/reducers/actions.js";
import "./category.scss";
//an svg icon
import cartIcon from "../../images/cart.svg";

class Category extends Component {
  //add to cart
  onAdditem(content) {
    this.props.addItemAction(content);
    this.props.cartTotalAction();
  }

  render() {
    //index of array for price pick from redux store
    const priceIndex = this.props.price;
    //index of array for categories pick from redux store
    const categoryIndex = this.props.category;
    //data from graphql pollo
    const products = this.props.data.categories[categoryIndex].products;
    const category = this.props.data.categories[categoryIndex].name;

    return (
      <section className="category change">
        <div>
          <h2>{category}</h2>
        </div>
        <div>
          {products.map((data) => (
            <div key={data.id} className="col animate">
              <Link to={data.inStock === true && `pdp/${data.id}`}>
                <div
                  className={data.inStock === false ? "opacity" : undefined}
                  style={{ backgroundImage: "url(" + data.gallery[0] + ")" }}
                >
                  {data.inStock === false && <h3>Out Of Stock!</h3>}
                </div>
              </Link>
              <p>{data.name}</p>
              <b>
                {data.prices[priceIndex].currency.symbol}{" "}
                {data.prices[priceIndex].amount}
              </b>
              <Link to={data.inStock === true && "/cart"}>
                <span
                  className={data.inStock === false ? "opacity" : "animate btn"}
                  onClick={() => this.onAdditem({ ...data, quantity: 1 })}
                >
                  <img src={cartIcon} alt="cart" />
                </span>
              </Link>
            </div>
          ))}
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    category: state.category,
    price: state.price
  };
};

export default connect(mapStateToProps, { addItemAction, cartTotalAction })(
  Category
);
