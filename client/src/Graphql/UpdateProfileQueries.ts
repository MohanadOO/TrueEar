import { gql } from '@apollo/client'

const UPDATE_AVATAR = gql`
  mutation UpdateUser($id: ID!, $data: UsersPermissionsUserInput!) {
    updateUsersPermissionsUser(id: $id, data: $data) {
      data {
        id
        attributes {
          username
          avatar
          email
          confirmed
        }
      }
    }
  }
`

export default UPDATE_AVATAR
