import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  addItemAction,
  cartTotalAction
} from "../../redux/reducers/actions.js";
import "./description.scss";

class Description extends Component {
//add to cart
  onAdditem(content) {
    this.props.addItemAction(content);
    this.props.cartTotalAction();
  }

  render() {
//index of array for price pick from redux store  
    const priceIndex = this.props.price;
//to identify id of product gotten from path
    const productId = window.location.pathname.slice(5);
//data from graphql pollo
    const data = this.props.data.categories[0].products.find(
      (item) => item.id === productId
    );

    const { gallery, name, brand, attributes, prices, description } = data;

    return (
      <div className="description change">
        <div className="mainDiv">
          <div>
            <img src={gallery[1]} alt="" />
            <img src={gallery[2]} alt="" />
            <img src={gallery[3]} alt="" />
          </div>

          <div>
            <img src={gallery[0]} alt="" />
          </div>

          <div>
            <div>
              <p>{name}</p>
              <p>{brand}</p>

              {attributes.map(({ name, items, type, id }) => {
                return (
                  <>
                    {type === "swatch" && (
                      <p key={id} className="p">
                        {name}:
                      </p>
                    )}
                    <div key={id} className="attribute">
                      {items.map(({ value, id }) => (
                          <div className="animate btn" key={id}>
                            {type === "swatch" && (
                              <span
                                style={{ backgroundColor: `${value}` }}
                              ></span>
                            )}
                          </div>
                        ))}
                    </div>
                  </>
                );
              })}

              <p className="p">
                price: <br /> {prices[priceIndex].currency.symbol} {prices[priceIndex].amount}
              </p>
              <Link to="/cart">
                <button
                  onClick={() => this.onAdditem({ ...data, quantity: 1 })}
                  className="animate btn"
                >
                  Add To Cart
                </button>
              </Link>

              <div id="description"> {description}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    price: state.price
  };
};

export default connect(mapStateToProps, { addItemAction, cartTotalAction })(
  Description
);
