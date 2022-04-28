import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addItemAction, deleteItemAction, decreaseItemAction, clearCartAction, cartTotalAction } from "../../redux/reducers/actions.js";
import deleteIcon from "../../images/delete.svg";
import "./cart.scss"; 
 
  
class Cart extends Component {
  constructor(){
    super();
    this.state = {
      checkout: "none",
      count: 0
    }
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
//delete item
  onDeleteitem(id) {
    this.props.deleteItemAction(id);
    this.props.cartTotalAction();
  }
//clear cart
  onClearCart() {
    this.props.clearCartAction();
    this.props.cartTotalAction();
  }
//right img select function
  arrowRight(e) {
      this.state.count === 3 ? 
     this.setState({count: 0}) : this.setState({count: e += 1})  
  }
//left img select function
  arrowLeft(e) {
    this.state.count === 0 ? 
   this.setState({count: 4}) : this.setState({count: e -= 1})  
  }

  render() {
//index of array for price pick from redux store 
    const priceIndex = this.props.price;
//current state of cart from redux store
    const cart = this.props.cart;
//current total and quantity of cart
    const {total, cartQuantity} = this.props.cartTotal;
//data from graphql pollo    
    const currencies = this.props.data.currencies;
  
    return (
      <> 
      <section className="cart change"> 

        <div className="div1">
          <h2>CART</h2> 
        </div>
 
      {cart.map((data, index)=> (
        <>
        <div key={data.id} className="div2">
        <Link to={`/pdp/${data.id}`}> 
        <h3 className="h3 animate btn">DescriptionPage</h3>
        </Link>
        <img className="animate btn" onClick={()=> this.onDeleteitem(data.id)} src={deleteIcon} alt="" />
        </div>
        
        <div className="div3" key={index}>
          <div>
            <div>
              <p>{data.name}</p>
              <p>{data.brand}</p>

              <p className="p">
                {data.prices[priceIndex].currency.symbol} {data.prices[priceIndex].amount * data.quantity}
              </p>

              {data.attributes.map(({name, items, type, id}, index)=>  (
                <>
                  <p className="p" key={index}>{name}:</p>
                  <div key={id} className="attribute">
                    {items.map(({value, id})=> (
                      <div className="animate btn" key={id}>
                      {type === "text"? <span>{value}</span> : <span style={{backgroundColor: `${value}`}}></span>}
                      </div>
                      ))}
                  </div>
                </>
                ))} 
              </div>
          </div>
          
          <div>
            <div>
              <span onClick={() => this.onAdditem({ ...data, quantity: 1 })} className="span animate btn">+</span>
              <span>{data.quantity}</span>
              <span onClick={()=> this.onDecreaseitem(data.id)} className="span animate btn">-</span>
            </div>

            <div className="animate btn" style={{ backgroundImage: "url(" + data.gallery[this.state.count] + ")" }} >
              <i onClick={()=> this.arrowLeft(this.state.count)} className="arrow left" /> 
              <i onClick={()=> this.arrowRight(this.state.count)} className="arrow right" />
            </div>
          </div> 
        </div>
      </>))}

      <div className="div4">
          <p>Tax: <b>{currencies[priceIndex].symbol} 30</b></p> 
          <p>Qty: <b>{cartQuantity}</b></p> 
          <p>Total: <b>{currencies[priceIndex].symbol} {total}</b></p> 
          <div>
            <button onClick={()=> {this.setState({checkout: "unset"});this.onClearCart()}} className="animate btn">CHECK OUT</button>
            <button onClick={() => this.onClearCart()} className="animate btn">CLEAR CART</button>
          </div>
      </div>
      </section> 

      <div style={{display: this.state.checkout}} className="alert">
        <span 
        onClick={()=> this.setState({checkout: "none"})} 
        className="closebtn">&times;</span>
        You have successfully checked out!
      </div> 

      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    cartTotal: state.cartTotal,
    price: state.price
  };
};

export default connect(mapStateToProps, { addItemAction, deleteItemAction, decreaseItemAction, clearCartAction, cartTotalAction })(
  Cart
);
