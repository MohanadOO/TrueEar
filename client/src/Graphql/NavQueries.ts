import { gql } from '@apollo/client'

const ITEMS = gql`
  query GetItems {
    items {
      data {
        id
        attributes {
          price
        }
      }
    }
  }
`

export default ITEMS
