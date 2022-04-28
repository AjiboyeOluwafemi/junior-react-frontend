import React, { Component } from "react";
//component pages
import Header from "./componens/header/Header.jsx";
import Category from "./componens/categoryPage/Category.jsx";
import Description from "./componens/descriptionPage/Description.jsx";
import Cart from "./componens/cartPage/Cart.jsx";
import Errorpage from "./componens/errorPage/Errorpage.jsx";
import "./app.scss";
//react router
import { BrowserRouter, Routes, Route } from "react-router-dom";
//apollo
import { Query } from "@apollo/client/react/components"; 
import PRODUCTS_QUERY from "./graphQL.js";

export default class App extends Component {
  render() {
    return (
      <Query query={PRODUCTS_QUERY}>
        {({ loading, error, data }) => {
          if (loading)
            return (
              <div className="apolloStatus">
                <span className="loader"></span>
              </div>
            );
          if (error)
            return (
              <div className="apolloStatus">
                <h1>Error :(</h1>
              </div>
            );

          return (
            <BrowserRouter>
              <Header data={data} />

              <Routes>
                <Route path="/" element={<Category data={data} />} />

                <Route path="pdp/:id" element={<Description data={data} />} />

                <Route path="cart" element={<Cart data={data} />} />

                {/* Routes that arent available */}
                <Route path="/:wrongPage" element={<Errorpage />} />
              </Routes>
            </BrowserRouter>
          );
        }}
      </Query>
    );
  }
}
