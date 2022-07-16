import { gql } from '@apollo/client'

export const USER_INFO = gql`
  query USER_INFO($id: ID!) {
    usersPermissionsUser(id: $id) {
      data {
        id
        attributes {
          username
          email
          confirmed
          avatar
        }
      }
    }
  }
`
