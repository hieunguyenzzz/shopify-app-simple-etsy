import {gql} from '@apollo/client';

export const GET_ALL_PRODUCTS = gql`
  query getAllProduct($name: String){
    products(where: {store: {name: $name}}) {
      id
      name
      etsyProductId
      shopifyProductId
      productVariantIds
      store {
        name
      }
    }
  }
`
