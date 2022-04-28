import React from "react";
import App from "./App.jsx";
import { createRoot } from "react-dom/client";
//redux
import { store } from "./redux/store.js";
import { Provider } from "react-redux";
//apollo
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache()
}); 

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Provider>
);
