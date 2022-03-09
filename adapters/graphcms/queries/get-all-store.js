import {gql} from '@apollo/client';

export const GET_ALL_STORES = gql`
  {
    stores(first: 999) {
        name
    }
  }
`
