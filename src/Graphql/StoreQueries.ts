import { gql } from '@apollo/client'

export const ITEMS = gql`
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

export const STORE_SECTIONS = gql`
  query StoreSections {
    storeSections {
      data {
        id
        attributes {
          section_name
          sub_text
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
      }
    }
  }
`
