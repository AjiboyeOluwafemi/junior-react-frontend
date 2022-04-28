import {gql} from "@apollo/client";

const PRODUCTS_QUERY = gql`
 query {
    categories {
      name	
      products {
      id
      name
      brand
      inStock
      category
      description
      gallery
      prices {
        currency {
          symbol
          }
        amount
        }
      attributes {
      id
      name
      type
      items{
        displayValue
      	value
        id
          }
        }
      }
    }

    currencies {
      label
      symbol
    }
  }
`;
export default PRODUCTS_QUERY; 