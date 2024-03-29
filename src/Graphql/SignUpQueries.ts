import { gql } from '@apollo/client'

const REGISTER = gql`
  mutation RegisterUser($input: UsersPermissionsRegisterInput!) {
    register(input: $input) {
      jwt
      user {
        username
        email
        id
        confirmed
      }
    }
  }
`

export default REGISTER
