import { gql } from '@apollo/client'

const ITEMS = gql`
  query GetItems {
    items {
      data {
        id
        attributes {
          title
          price
          stars
          img {
            data {
              attributes {
                formats
              }
            }
          }
        }
      }
    }
  }
`

export default ITEMS
