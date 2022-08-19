import { gql } from '@apollo/client'

const ITEM = gql`
  query GetItem($id: ID!) {
    item(id: $id) {
      data {
        id
        attributes {
          title
          price
          stars
          img {
            data {
              attributes {
                url
                formats
              }
            }
          }
        }
      }
    }
  }
`

export default ITEM
